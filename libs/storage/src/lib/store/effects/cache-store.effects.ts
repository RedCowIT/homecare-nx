import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {StorageService} from "../../services/storage/storage.service";


@Injectable()
export class CacheStoreEffects {

  // initEntitySync$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(initEntitySync),
  //     switchMap(action => this.storageService.set(DEVICE_ID_KEY, action.id))
  //   );
  // }, {dispatch: false});

  constructor(private actions$: Actions,
              private storageService: StorageService) {}

}
