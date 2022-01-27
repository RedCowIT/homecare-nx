import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {first, map, tap} from 'rxjs/operators';
import {
  initEntitySync,
  initEntitySyncError, initEntitySyncSuccess, syncEntities, syncEntitiesError, syncEntitiesSuccess
} from "../../../../../../libs/entity/src/lib/store/actions/entity-sync.actions";
import {Auth0Service} from "@homecare/auth0";
import {EntitySyncErrorService} from "../../services/entity-sync-error/entity-sync-error.service";
import {LoadingController} from "@ionic/angular";
import {
  selectEntitySyncPayloadId,
  selectIsEntitySyncLoading
} from "../../../../../../libs/entity/src/lib/store/selectors/entity-sync.selectors";
import {Store} from "@ngrx/store";


@Injectable()
export class AppEffects {



  // loading$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType
  //   )
  // }, {dispatch: false});

  // initEntitySync$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(initEntitySync, syncEntities),
  //     tap(async (action) => {
  //       this.loading = await this.loadingCtrl.create({
  //         message: 'Connecting to server...',
  //         duration: 10000
  //       });
  //       await this.loading.present();
  //     }),
  //   );
  // }, {dispatch: false});
  //
  // initEntitySyncSuccess$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(syncEntitiesSuccess),
  //     tap(async (action) => {
  //
  //       console.log('SYNC SUCCESS', this.loading);
  //
  //       if (this.loading) {
  //         await this.loading.dismiss();
  //       }
  //
  //     }),
  //   );
  // }, {dispatch: false});

  entitySyncError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initEntitySyncError, syncEntitiesError),
      tap(async (action) => {
        await this.entitySyncErrorService.handleError(action.error);
      }),
    );
  }, {dispatch: false});

  constructor(private actions$: Actions,
              private store$: Store,
              private auth0Service: Auth0Service,
              private entitySyncErrorService: EntitySyncErrorService,
              private loadingCtrl: LoadingController) {

    console.log('APP EFFECTS CTOR');



  }

}
