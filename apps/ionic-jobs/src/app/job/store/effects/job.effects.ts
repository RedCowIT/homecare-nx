import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  addJob,
  addJobError,
  addJobSuccess,
  completeJobSection,
  reloadJobSections,
  setJobSections
} from "../actions/job.actions";
import {catchError, filter, first, map, mergeMap, tap, withLatestFrom} from "rxjs/operators";
import {
  Appointment,
  AppointmentVisit, CustomerPlan,
  CustomerPlanChange,
  findById,
  findByKey,
  findIndexWithId,
  firstByKey,
  JobSection,
  JobSectionStatus,
  jobSectionStatusComparer, removeMissingFromCache,
  selectEntity,
  selectOrFetchEntity
} from "@homecare/shared";
import {JobService} from "../../services/job/job.service";
import {ChecklistItemStatus} from "@homecare/common";
import {combineLatest, forkJoin, Observable, of, throwError} from "rxjs";
import {getJobMap} from "../selectors/job.selectors";
import {Store} from "@ngrx/store";
import {AppointmentCallTypesService, AppointmentsService, AppointmentVisitsService} from "@homecare/appointment";
import {QuoteManagerService} from "../../../../../../../libs/billing/src/lib/services/quote-manager/quote-manager.service";
import {CustomerPlansService, CustomersService} from "@homecare/customer";
import {LoggerService} from "@homecare/core";
import {CustomerPlanFinanceDocumentsService} from "../../../../../../../libs/customer/src/lib/store/entity/services/customer-plan-finance-documents/customer-plan-finance-documents.service";
import {PlansService, PlanTypesService} from "@homecare/plan";
import {InvoiceManagerService} from "@homecare/billing";
import {CustomerPlanManagerService} from "../../../../../../../libs/customer/src/lib/services/customer-plan-manager/customer-plan-manager.service";
import {DirectDebitDetailsService} from "../../../../../../../libs/customer/src/lib/store/entity/services/direct-debit-details/direct-debit-details.service";
import {CustomerPlanChangesService} from "../../../../../../../libs/customer/src/lib/store/entity/services/customer-plan-changes/customer-plan-changes.service";
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {invoiceLoaded} from "../../../../../../../libs/billing/src/lib/store/actions/billing.actions";


@Injectable()
export class JobEffects {

  addJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addJob),
      mergeMap(action => {
        return this.getAppointment(action.appointmentId)
          .pipe(
            mergeMap(appointment => {

              const tasks = [
                this.initAppointmentVisit(appointment),
                this.initAppointmentCallTypes(appointment),
                this.quoteManagerService.loadAppointmentQuote(appointment.id),
                this.initCustomer(appointment),
                this.initCustomerPlans(appointment),
                this.initCustomerPlanChanges(appointment),
                this.initCustomerDirectDebitDetails(appointment),
                this.invoiceManagerService.loadAppointmentInvoice(appointment.id)
              ];

              return forkJoin(tasks).pipe(map(() => appointment));

            }),
            mergeMap(appointment => {
              return this.createJobSections(appointment.id).pipe(
                first(),
                map(jobSections => {
                  return addJobSuccess({appointmentId: appointment.id, jobSections});
                })
              );
            }),
            catchError(error => {
              this.loggerService.error("Add job error", error);
              this.currentJobService.addJobError(action.appointmentId);
              return of(addJobError({appointmentId: action.appointmentId, error}));
            })
          )
      })
    );
  });

  getAppointment(appointmentId): Observable<Appointment> {
    return selectOrFetchEntity(this.appointmentsService, appointmentId).pipe(first());
  }


  reloadJobSections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(reloadJobSections),
      mergeMap(action => {

        return this.createJobSections(action.appointmentId).pipe(
          first(),
          map(jobSections => {
            return setJobSections({appointmentId: action.appointmentId, jobSections});
          }),
          catchError(error => {
            console.error('Error creating job sections after customer plan finance doc update', error);
            return of(null);
          })
        );

      })
    );
  });

  completeJobSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(completeJobSection),
      withLatestFrom(this.store$.select(getJobMap)),
      filter(([action, jobMap]) => !!jobMap[action.appointmentId]),
      mergeMap(([action, jobMap]) => {

        const job = {...jobMap[action.appointmentId]};

        const sections = job.jobSections.map(jobSection => {
          return {...jobSection};
        });

        if (action.sectionId === JobSection.Invoice) {
          return this.customerPlanManagerService.appointmentHasFinanceDocs(action.appointmentId).pipe(
            map(hasFinanceDocs => {

              // add finance section
              if (hasFinanceDocs) {
                if (!firstByKey(sections, 'id', JobSection.Finance)) {
                  sections.push({
                    id: JobSection.Finance,
                    status: ChecklistItemStatus.Disabled
                  });
                  sections.sort(jobSectionStatusComparer);
                }
              }

              this.completeSection(action.sectionId, sections);
              return setJobSections({appointmentId: action.appointmentId, jobSections: sections});
            }),
            first()
          );
        } else {
          this.completeSection(action.sectionId, sections);
          return of(setJobSections({appointmentId: action.appointmentId, jobSections: sections}));
        }


      })
    );
  });

  constructor(private store$: Store,
              private actions$: Actions,
              private jobsService: JobService,
              private appointmentsService: AppointmentsService,
              private appointmentVisitsService: AppointmentVisitsService,
              private appointmentCallTypesService: AppointmentCallTypesService,
              private quoteManagerService: QuoteManagerService,
              private plansService: PlansService,
              private planTypesService: PlanTypesService,
              private customerPlansService: CustomerPlansService,
              private customerPlanFinanceDocumentsService: CustomerPlanFinanceDocumentsService,
              private customersService: CustomersService,
              private directDebitDetailsService: DirectDebitDetailsService,
              private customerPlanChangesService: CustomerPlanChangesService,
              private invoiceManagerService: InvoiceManagerService,
              private customerPlanManagerService: CustomerPlanManagerService,
              private currentJobService: CurrentJobService,
              private loggerService: LoggerService) {
  }

  private completeSection(sectionId: string, sections: JobSectionStatus[]) {
    const index = findIndexWithId(sections, sectionId);

    const section = findById(sections, sectionId);
    section.status = ChecklistItemStatus.Complete;

    if (index < sections.length - 1) {
      if (sections[index + 1].status == ChecklistItemStatus.Disabled) {
        sections[index + 1].status = ChecklistItemStatus.Enabled;
      }
    }
  }

  private createJobSections(appointmentId: number):
    Observable<JobSectionStatus[]> {

    return combineLatest([
      this.jobsService.isNCOOnly(appointmentId),
      this.customerPlanManagerService.appointmentHasFinanceDocs(appointmentId),
      this.customerPlanChangesService.hasPlanChanges(appointmentId)
    ]).pipe(
      map(([isNCOOnly, hasFinanceDocs, hasPlanChanges]) => {

        const sections = [
          {
            id: JobSection.Info,
            status: ChecklistItemStatus.Enabled
          }
        ];

        console.log('Calculating sections', {isNCOOnly});

        if (!isNCOOnly) {
          sections.push({
            id: JobSection.PreJob,
            status: ChecklistItemStatus.Enabled
          });
        }

        sections.push(
          {
            id: JobSection.Quote,
            status: ChecklistItemStatus.Disabled
          },
          {
            id: JobSection.Contact,
            status: ChecklistItemStatus.Disabled
          },
          {
            id: JobSection.Invoice,
            status: ChecklistItemStatus.Disabled
          });

        if (hasFinanceDocs) {
          sections.push({
            id: JobSection.Finance,
            status: ChecklistItemStatus.Enabled
          });
        }

        sections.push(
          {
            id: JobSection.Payment,
            status: ChecklistItemStatus.Disabled
          },
          {
            id: JobSection.DD,
            status: ChecklistItemStatus.Disabled
          }
        );

        if (hasPlanChanges) {
          sections.push({
            id: JobSection.PlanChange,
            status: ChecklistItemStatus.Disabled
          });
        }

        sections.push({
          id: JobSection.SignOff,
          status: ChecklistItemStatus.Disabled
        });


        return sections;

      })
    )
  }

  private initAppointmentVisit(appointment: Appointment): Observable<AppointmentVisit> {

    return selectEntity(this.appointmentVisitsService, appointment.id).pipe(
      first(),
      mergeMap(appointmentVisit => {
        if (appointmentVisit) {
          return of(appointmentVisit);
        }

        return this.appointmentVisitsService.getWithQuery({
          appointmentId: `${appointment.id}`
        }).pipe(
          map(appointmentVisits => {
            return firstByKey(appointmentVisits, 'id', appointment.id)
          })
        );
      }),
      mergeMap(appointmentVisit => {

        if (!appointmentVisit) {
          return this.appointmentVisitsService.add({
            id: appointment.id,
          } as AppointmentVisit);
        }

        return of(appointmentVisit);
      }),
    );
  }

  private initAppointmentCallTypes(appointment: Appointment) {

    return this.appointmentCallTypesService.entities$.pipe(
      first(),
      mergeMap(callTypes => {
        const appointmentCallTypes = findByKey(callTypes, 'appointmentId', appointment.id);
        if (appointmentCallTypes?.length > 0) {
          return of(appointmentCallTypes);
        } else {
          return this.appointmentCallTypesService.getWithQuery({
            appointmentId: `${appointment.id}`
          }).pipe(
            tap(customerPlans => {
              removeMissingFromCache(this.appointmentCallTypesService, appointmentCallTypes, {key: 'appointmentId', value: appointment.id});
            }),
            catchError(error => throwError(error))
          );
        }
      })
    )
  }

  private initCustomerPlans(appointment: Appointment): Observable<CustomerPlan[]> {

    return this.customerPlansService.getWithQuery({
      customerId: `${appointment.customerId}`
    }).pipe(tap(customerPlans => {
      removeMissingFromCache(this.customerPlansService, customerPlans, {key: 'customerId', value: appointment.customerId});
    }));

  }

  private initCustomerDirectDebitDetails(appointment: Appointment) {

    return this.directDebitDetailsService.getWithQuery({
      appointmentId: `${appointment.id}`
    });


  }

  private initCustomerPlanChanges(appointment: Appointment): Observable<CustomerPlanChange[]> {

    return this.customerPlanChangesService.getWithQuery({
      appointmentId: `${appointment.id}`,
      customerId: `${appointment.customerId}`
    });

  }

  private initCustomer(appointment: Appointment) {

    return selectOrFetchEntity(this.customersService, appointment.customerId).pipe(first());

  }

}
