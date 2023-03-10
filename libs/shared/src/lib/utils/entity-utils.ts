import {Dictionary} from "@ngrx/entity";
import {EntityCollectionServiceBase, MergeStrategy} from "@ngrx/data";
import {combineLatest, Observable, of} from "rxjs";
import {first, map, mergeMap, tap} from "rxjs/operators";
import {findById, findByKey, firstItem} from "./array-utils";

export function entityMapValues<T>(dictionary: Dictionary<T>, keys: any[]) {

  if (!keys || keys.length == 0) {
    return [];
  }

  return keys.map(key => dictionary[key]).filter(v => !!v);
}

/**
 * Select an entity from a service via entity map lookup
 *
 * @param entityService
 * @param id
 */
export function selectEntity<T>(entityService: EntityCollectionServiceBase<T>, id: any): Observable<T> {
  return entityService.entityMap$.pipe(map(entityMap => entityMap[id]));
}

export function selectOrFetchEntity<T>(entityService: EntityCollectionServiceBase<T>, id: any): Observable<T> {
  return entityService.entityMap$.pipe(map(entityMap => entityMap[id])).pipe(
    mergeMap(entity => {
      if (entity) {
        return of(entity);
      } else {
        return entityService.getByKey(id);
      }
    })
  );
}

export function selectEntityByKey<T>(entityService: EntityCollectionServiceBase<T>, key: string, value: any): Observable<T[]> {
  return entityService.entities$.pipe(map(entities => findByKey(entities, key, value)));
}

export function selectFirstEntityByKey<T>(entityService: EntityCollectionServiceBase<T>, key: string, value: any): Observable<T> {
  return selectEntityByKey(entityService, key, value).pipe(map(entities => firstItem(entities)));
}

export function selectOrFetchFirstEntityByKey<T>(entityService: EntityCollectionServiceBase<T>, key: string, value: any): Observable<T> {

  return selectFirstEntityByKey(entityService, key, value).pipe(
    mergeMap(entity => {
      if (entity) {
        return of(entity);
      }

      return fetchFirstEntityByKey(entityService, key, value);
    })
  )

}

export function fetchFirstEntityByKey<T>(entityService: EntityCollectionServiceBase<T>, key: string, value: any): Observable<T> {
  const query: any = {};
  query[`${key}`] = `${value}`;

  return entityService.getWithQuery(query).pipe(
    map(entities => firstItem(entities))
  );
}

export function joinEntityLoading(entityServices: EntityCollectionServiceBase<any>[]): Observable<boolean> {
  const loading$ = [];
  for (const entityService of entityServices) {
    loading$.push(entityService.loading$);
  }
  return combineLatest(loading$).pipe(
    map(loadings => {
      for (const loading of loadings) {
        if (loading) {
          return true;
        }
      }
      return false;
    })
  );
}

/**
 * Remove entities that are missing from cache.
 *
 * Optional filter allows you to remove entities only if they have a specific property set. This allows you to
 * do things like remove entities missing from cache that belong to invoice_id = 512
 *
 * @param entityService
 * @param entities
 * @param filter
 */
export function removeMissingFromCache<T>(entityService: EntityCollectionServiceBase<T>, entities: T[], filter?: { key: string, value: string | number }) {
  entityService.entities$.pipe(first()).subscribe(currentEntities => {
    for (const currentEntity of currentEntities) {
      if (filter) {
        if (currentEntity[filter.key] !== filter.value) {
          continue;
        }
      }
      const currentEntityId = (currentEntity as any).id;
      if (!findById(entities, currentEntityId)) {
        entityService.removeOneFromCache(currentEntityId, {
          mergeStrategy: MergeStrategy.IgnoreChanges
        });
      }
    }
  });
}
