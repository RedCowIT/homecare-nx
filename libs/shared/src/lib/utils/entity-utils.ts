import {Dictionary} from "@ngrx/entity";
import {EntityCollectionServiceBase} from "@ngrx/data";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {findByKey, firstItem} from "./array-utils";

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

export function selectEntityByKey<T>(entityService: EntityCollectionServiceBase<T>, key: string, value: any): Observable<T[]> {
  return entityService.entities$.pipe(map(entities => findByKey(entities, key, value)));
}

export function selectFirstEntityByKey<T>(entityService: EntityCollectionServiceBase<T>, key: string, value: any): Observable<T> {
  return selectEntityByKey(entityService, key, value).pipe(map(entities => firstItem(entities)));
}
