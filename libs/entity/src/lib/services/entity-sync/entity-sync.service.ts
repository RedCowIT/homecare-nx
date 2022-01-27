import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {initEntitySync, registerEntity, unregisterEntity} from "../../store/actions/entity-sync.actions";
import {Observable} from "rxjs";
import {selectIsEntitySyncLoading} from "../../store/selectors/entity-sync.selectors";
import {tap} from "rxjs/operators";

/**
 * Load entities from remote API and sync to cache.
 * Useful for downloading required data sets for working offline.
 *
 * Usage:
 * Register entities from your modules and then call sync in app init cycle.
 */
@Injectable({
  providedIn: 'root'
})
export class EntitySyncService {

  readonly isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.isLoading$ = this.store.select(selectIsEntitySyncLoading);
  }

  registerEntity(entityName: string) {

    this.store.dispatch(registerEntity({
      entityName
    }));
  }

  unregisterEntity(entityName: string) {
    this.store.dispatch(unregisterEntity({
      entityName
    }));
  }

  init(payloadEntityName: string) {
    this.store.dispatch(initEntitySync({payloadEntityName}));
  }
}
