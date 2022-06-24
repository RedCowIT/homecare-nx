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
import {authActions} from "../../../../../../libs/auth/src/lib/store/actions";
import {AppointmentEntity} from "@homecare/appointment";
import {CustomerEntity} from "@homecare/customer";
import {EntityServices} from "@ngrx/data";
import {BillingEntity} from "@homecare/billing";
import {AlertService} from "../../../../../../libs/core/src/lib/services/alert/alert.service";
import * as Sentry from "@sentry/angular";
import {environment} from "../../../environments/environment";
import {getUsername} from "../../../../../../libs/auth/src/lib/store/selectors/auth.selectors";


@Injectable()
export class AppEffects {

  entitySyncError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initEntitySyncError, syncEntitiesError),
      tap(async (action) => {
        try {
          await this.entitySyncErrorService.handleError(action.error);
        } catch (e) {
          this.logger.error('Error handling entity sync error', e);
        }
      }),
    );
  }, {dispatch: false});

  addJobError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addJobError),
      tap(async (action) => {
        this.logger.error('AddJobError', action.error);

        await this.alertService.error('Failed loading job. Please contact the office to resolve.');

        await this.router.navigateByUrl('/main/jobs');
      }),
    );
  }, {dispatch: false});

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(async (action) => {

          if (environment.sentry.enabled){
            this.store$.select(getUsername).pipe(
              first()
            ).subscribe(username => {
              if (username){
                try {
                  Sentry.setUser({ username });
                } catch (e){
                  this.logger.error('Error unsetting sentry user after logout', e);
                }
              }
            })
          }

      }),
    );
  }, {dispatch: false});

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.logout),
      tap(async (action) => {
        try {
          this.resetData();
        }
        catch (e){
          this.logger.error('Error handling logout', e);
        }
        try {
          if (environment.sentry.enabled){
            Sentry.configureScope(scope => scope.setUser(null));
          }
        } catch (e){
          this.logger.error('Error unsetting sentry user after logout', e);
        }
      }),
    );
  }, {dispatch: false});

  constructor(private actions$: Actions,
              private store$: Store,
              private auth0Service: Auth0Service,
              private entitySyncErrorService: EntitySyncErrorService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private logger: LoggerService,
              private entityServices: EntityServices,
              private alertService: AlertService) {


  }

  resetData() {
    try {

      const entities = [
        AppointmentEntity.Appointment,
        AppointmentEntity.AppointmentNoAnswer,
        CustomerEntity.Customer,
        CustomerEntity.CustomerAppliance,
        BillingEntity.InvoiceItem,
        BillingEntity.Invoice
      ];

      for (const entityName of entities) {
        const entityService = this.entityServices.getEntityCollectionService(entityName);
        entityService.clearCache();
      }

    } catch (e) {
      console.error('Error clearing cache on logout')
    }
  }

}
