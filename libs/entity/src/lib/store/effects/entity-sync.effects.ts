import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, first, map, mergeMap, switchMap} from "rxjs/operators";
import {
  initEntitySync,
  initEntitySyncError,
  initEntitySyncSuccess, syncEntities, syncEntitiesError,
  syncEntitiesSuccess
} from "../actions/entity-sync.actions";
import {StorageService} from "@homecare/storage";
import {EntityCacheService} from "../../services/entity-cache/entity-cache.service";
import {combineLatest, EMPTY, forkJoin, Observable, of} from "rxjs";
import {EntityCacheItem} from "../../models/entity-cache-item";
import {Store} from "@ngrx/store";
import {
  selectEntitySyncPayloadEntityName,
  selectEntitySyncPayloadId,
  selectSyncEntities
} from "../selectors/entity-sync.selectors";
import {EntityServices} from "@ngrx/data";
import {LoggerService} from "@homecare/core";
import {haveSameContents, lastItem, pluck} from "@homecare/shared";
import {load} from "dotenv";


@Injectable()
export class EntitySyncEffects {

  static readonly CACHE_KEY = 'entity_sync';

  /**
   * If cached, init store and continue; if not, start sync.
   */
  initEntitySync$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initEntitySync),
      switchMap(action => {

        return this.entityCacheService.get(EntitySyncEffects.CACHE_KEY).pipe(
          mergeMap(entityCacheItem => {

            if (entityCacheItem) {
              return this.initStoreFromCache(entityCacheItem).pipe(
                catchError(error => {
                  console.warn('Failed to init store from cache', error);
                  return of(null);
                })
              )
            }

            return of(null);

          }),
          mergeMap((loadedPayload: string) => {

            if (loadedPayload) {

              this.logger.debug('EntitySync: initialised from cache.');

              return of(initEntitySyncSuccess({
                payloadId: loadedPayload
              }), syncEntities()); // fire sync to latest after success action
            }

            this.logger.debug('EntitySync: cache miss, init from fetch.');

            return this.syncEntities().pipe(
              switchMap(payloadId => {
                return [
                  syncEntitiesSuccess({
                    payloadId
                  }),
                  initEntitySyncSuccess({
                    payloadId
                  })
                ]
              })
            );

          }),
          catchError(error => of(initEntitySyncError({error})))
        );

      })
    );
  });

  syncEntities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(syncEntities),
      switchMap(action => {
        return this.syncEntities().pipe(
          map(payloadId => syncEntitiesSuccess({payloadId})),
          catchError(error => of(syncEntitiesError({error})))
        )
      })
    );
  });

  constructor(private store: Store,
              private actions$: Actions,
              private storageService: StorageService,
              private entityCacheService: EntityCacheService,
              private entityServices: EntityServices,
              private logger: LoggerService) {
  }

  /**
   * If successful, returns payload id of populated cache items.
   *
   * @param entityCacheItem
   */
  initStoreFromCache(entityCacheItem: EntityCacheItem): Observable<string> {

    return this.store.select(selectSyncEntities).pipe(
      first(),
      map(entityNames => {

        if (!this.validateEntityCacheItem(entityNames, entityCacheItem)) {
          return null;
        }

        this.populateEntities(entityCacheItem.data);

        return entityCacheItem.payloadId;
      }),
      catchError(error => {
        console.warn('Failed to init store from cache', error);
        return of(null);
      })
    )

  }

  validateEntityCacheItem(entityNames: string[], entityCacheItem: EntityCacheItem): boolean {
    if (!entityCacheItem?.data) {
      return false;
    }
    if (entityNames.length <= 0) {
      throw new Error('Cannot validate entity cache item against empty entity name set');
    }
    if (!haveSameContents(entityNames, pluck(entityCacheItem.data as [], 'entityName'))) {
      this.logger.warn('Cached entity name mismatch, abandoning cache init.');
      return false;
    }

    return true;
  }

  populateEntities(entityData: Array<{ entityName: string, entities: unknown[] }>) {
    for (const entityItem of entityData) {

      const entityService = this.entityServices.getEntityCollectionService(entityItem.entityName)

      if (!entityService) {
        throw new Error(`No matching entity service for entity: ${entityItem.entityName}`);
      }


      entityService.addAllToCache(entityItem.entities);
    }
  }

  /**
   * Sync entities
   * @return Observable<string> payload ID
   */
  syncEntities(): Observable<string> {

    return this.fetchPayloadId().pipe(
      mergeMap(payloadId => {

        return forkJoin([of(payloadId), this.requiresFetch(payloadId)])

      }),
      mergeMap(([payloadId, requiresFetch]) => {

        if (requiresFetch) {
          this.logger.debug('Entity sync payload change, fetching new entities.')
          return this.fetchEntities(payloadId);
        } else {
          return of(payloadId);
        }
      })
    )

  }

  requiresFetch(payloadId: string): Observable<boolean> {

    return this.store.select(selectEntitySyncPayloadId).pipe(
      first(),
      map(lastPayloadId => {
        console.log({lastPayloadId, payloadId});
        return lastPayloadId !== payloadId;
      })
    )

  }

  fetchEntities(payloadId: string): Observable<string> {
    return this.store.select(selectSyncEntities).pipe(
      first()
    ).pipe(
      mergeMap((entityNames) => {

        const loads$ = [];

        for (const entityName of entityNames) {
          loads$.push(this.entityServices.getEntityCollectionService(entityName).load());
        }

        return forkJoin(loads$);
      }),
      mergeMap(() => {
        return this.cacheEntities(payloadId);
      }),
      map(() => payloadId)
    )
  }

  fetchPayloadId(): Observable<string> {
    return this.store.select(selectEntitySyncPayloadEntityName).pipe(
      mergeMap(payloadEntityName => {
        return this.entityServices.getEntityCollectionService(payloadEntityName).load().pipe(
          map(payloadEntities => {
            return `${lastItem(payloadEntities).id}`;
          })
        )
      })
    )
  }

  cacheEntities(payloadId: string): Observable<boolean> {
    return this.store.select(selectSyncEntities).pipe(
      first(),
      concatMap((entityNames) => {

          const entities$ = [];

          for (const entityName of entityNames) {

            const cacheEntity$ = this.entityServices.getEntityCollectionService(entityName).entities$.pipe(
              first(),
              map(entities => {
                return {
                  entityName,
                  entities
                };
              })
            )

            entities$.push(cacheEntity$);
          }

          return forkJoin(entities$);

        }
      ),
      map((entityData: Array<{ entityName: string, entities: unknown[] }>) => {

        // TODO: async, do we need to wait on this?
        this.entityCacheService.save(EntitySyncEffects.CACHE_KEY,
          EntityCacheService.createEntityCacheItem(payloadId, entityData));

        return true;
      })
    );
  }

}
