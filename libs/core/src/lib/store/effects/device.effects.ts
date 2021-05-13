import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {initDeviceId, setDeviceId} from '../actions/device.actions';
import {guid} from '@homecare/shared';
import {Store} from '@ngrx/store';
import {DeviceState} from '../reducers/device.reducer';
import {DEVICE_ID_KEY} from '../../core.constants';
import {StorageService} from "@homecare/storage";


@Injectable()
export class DeviceEffects {

  initDeviceId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initDeviceId),
      mergeMap(action => this.storageService.get(DEVICE_ID_KEY)),
      map(deviceId => {

        let id;

        if (!!deviceId) {
          id = deviceId;
        } else {
          id = guid();
        }

        return setDeviceId({id});

      })
    );
  });

  setDeviceId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setDeviceId),
      switchMap(action => this.storageService.set(DEVICE_ID_KEY, action.id))
    );
  }, {dispatch: false});

  constructor(private actions$: Actions,
              private store$: Store<DeviceState>,
              private storageService: StorageService) {
  }

}
