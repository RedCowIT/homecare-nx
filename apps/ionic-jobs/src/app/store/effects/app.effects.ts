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
import {addJobError} from "../../job/store/actions/job.actions";
import {Router} from "@angular/router";
import {LoggerService} from "@homecare/core";


@Injectable()
export class AppEffects {

  entitySyncError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initEntitySyncError, syncEntitiesError),
      tap(async (action) => {
        await this.entitySyncErrorService.handleError(action.error);
      }),
    );
  }, {dispatch: false});

  addJobError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addJobError),
      tap(async (action) => {
        this.logger.error('AddJobError', action.error);
        await this.router.navigateByUrl('/main/jobs');
      }),
    );
  }, {dispatch: false});

  constructor(private actions$: Actions,
              private store$: Store,
              private auth0Service: Auth0Service,
              private entitySyncErrorService: EntitySyncErrorService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private logger: LoggerService) {

    console.log('APP EFFECTS CTOR');


  }

}
