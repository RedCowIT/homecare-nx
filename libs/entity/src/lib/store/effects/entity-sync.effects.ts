import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, first, map, mergeMap, switchMap} from "rxjs/operators";
import {
  initEntitySync,
  initEntitySyncError,
  initEntitySyncSuccess, syncEntities, syncEntitiesError,
  syncEntitiesSuccess
} from "../actions/entity-sync.actions";
import {StorageService} from "@homecare/storage";
import {EntityCacheService} from "../../services/entity-cache/entity-cache.service";
import {EMPTY, forkJoin, Observable, of} from "rxjs";
import {EntityCacheItem} from "../../models/entity-cache-item";
import {Store} from "@ngrx/store";
import {
  selectEntitySyncPayloadEntityName,
  selectEntitySyncPayloadId,
  selectSyncEntities
} from "../selectors/entity-sync.selectors";
import {EntityServices} from "@ngrx/data";
import {LoggerService} from "@homecare/core";
import {lastItem} from "@homecare/shared";


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

              this.logger.debug('EntitySync: init from cache.');

              this.initStoreFromCache(entityCacheItem); // TODO: async

              // continue and fire sync entities to check latest

              return of(initEntitySyncSuccess(), syncEntities());


            } else {

              this.logger.debug('EntitySync: cache miss, init from fetch.');

              return this.syncEntities().pipe(
                switchMap(payloadId => {
                  return [
                    syncEntitiesSuccess({
                      payloadId
                    }),
                    initEntitySyncSuccess()
                  ]
                })
              );

            }

          }),
          catchError(error => of(initEntitySyncError({error})))
        )

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

  initStoreFromCache(entityCacheItem: EntityCacheItem) {

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
      first()
    ).pipe(
      mergeMap((entityNames) => {

          const entities$ = [];

          for (const entityName of entityNames) {

            const cacheEntity$ = this.entityServices.getEntityCollectionService(entityName).entities$.pipe(
              first(),
              map(entities => {
                return of({
                  entityName,
                  entities
                })
              })
            )

            entities$.push(cacheEntity$);
          }

          return forkJoin(entities$);

        }
      ),
      map(entityData => {

        // TODO: async, do we need to wait on this?
        this.entityCacheService.save(EntitySyncEffects.CACHE_KEY,
          EntityCacheService.createEntityCacheItem(payloadId, entityData));

        return true;
      })
    );
  }

}
