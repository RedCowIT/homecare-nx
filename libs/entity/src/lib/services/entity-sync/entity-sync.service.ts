import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {initEntitySync, registerEntity, unregisterEntity} from "../../store/actions/entity-sync.actions";

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

  constructor(private store: Store) {

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

  init(payloadEntityName: string){
    this.store.dispatch(initEntitySync({payloadEntityName}));
  }
}
