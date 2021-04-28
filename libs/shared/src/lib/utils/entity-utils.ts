import {Dictionary} from "@ngrx/entity";
import {EntityCollectionServiceBase} from "@ngrx/data";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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
