import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {setDeviceId} from '../actions/device.actions';
import {Store} from '@ngrx/store';
import {DEVICE_ID_KEY} from '../../core.constants';
import {StorageService} from "@homecare/storage";
import {StoreLogState} from "../reducers/store-log.reducer";
import {logToStore, logToStoreSuccess} from "../actions/store-logger.actions";


@Injectable()
export class StoreLogEffects {

  logToStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logToStore),
      map(action => logToStoreSuccess())
    );
  });

  constructor(private actions$: Actions,
              private store$: Store<StoreLogState>) {
  }

}
