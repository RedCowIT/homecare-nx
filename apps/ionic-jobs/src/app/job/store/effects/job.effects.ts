import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addJob, addJobError, addJobSuccess, completeJobSection, setJobSections} from "../actions/job.actions";
import {catchError, filter, first, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {
  Appointment,
  AppointmentVisit,
  findById, findByKey,
  findIndexWithId, firstByKey,
  JobSection,
  JobSectionStatus, selectEntity, selectEntityByKey,
  selectOrFetchEntity,
  selectOrFetchFirstEntityByKey
} from "@homecare/shared";
import {JobService} from "../../services/job/job.service";
import {ChecklistItemStatus} from "@homecare/common";
import {combineLatest, Observable, of, throwError} from "rxjs";
import {getJobMap} from "../selectors/job.selectors";
import {Store} from "@ngrx/store";
import {AppointmentCallTypesService, AppointmentsService, AppointmentVisitsService} from "@homecare/appointment";
import {QuoteManagerService} from "../../../../../../../libs/billing/src/lib/services/quote-manager/quote-manager.service";
import {CustomerPlansService, CustomersService} from "@homecare/customer";


@Injectable()
export class JobEffects {

  addJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addJob),
      mergeMap(action => {
        return selectOrFetchEntity(this.appointmentsService, action.appointmentId)
          .pipe(
            mergeMap(appointment => {
              return this.initAppointmentVisit(appointment).pipe(
                first(),
                map(() => appointment)
              );
            }),
            mergeMap(appointment => {
              return this.initAppointmentCallTypes(appointment).pipe(
                first(),
                map(() => appointment)
              );
            }),
            mergeMap(appointment => {
              return this.quoteManagerService.loadAppointmentQuote(appointment.id).pipe(
                first(),
                map(() => appointment)
              );
            }),
            mergeMap(appointment => {
              return this.initCustomer(appointment).pipe(
                first(),
                map(() => appointment)
              );
            }),
            mergeMap(appointment => {
              return this.initCustomerPlans(appointment).pipe(
                first(),
                map(() => appointment)
              );
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
              console.error("ADD JOB ERROR", error);
              return of(addJobError({error}));
            })
          )
      })
    );
  });

  completeJobSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(completeJobSection),
      withLatestFrom(this.store$.select(getJobMap)),
      filter(([action, jobMap]) => !!jobMap[action.appointmentId]),
      map(([action, jobMap]) => {

        const job = {...jobMap[action.appointmentId]};

        const sections = job.jobSections.map(jobSection => {
          return {...jobSection};
        });

        const index = findIndexWithId(sections, action.sectionId);

        const section = findById(sections, action.sectionId);
        section.status = ChecklistItemStatus.Complete;

        if (index < sections.length - 1) {
          if (sections[index + 1].status == ChecklistItemStatus.Disabled) {
            sections[index + 1].status = ChecklistItemStatus.Enabled;
          }
        }

        return setJobSections({appointmentId: action.appointmentId, jobSections: sections});

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
              private customerPlansService: CustomerPlansService,
              private customersService: CustomersService) {
  }

  private createJobSections(appointmentId: number):
    Observable<JobSectionStatus[]> {

    return combineLatest([
      this.jobsService.isNCOOnly(appointmentId)
    ]).pipe(
      map(([isNCOOnly]) => {

        const sections = [
          {
            id: JobSection.Info,
            status: ChecklistItemStatus.Enabled
          }
        ];

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
          },
          {
            id: JobSection.Payment,
            status: ChecklistItemStatus.Disabled
          },
          {
            id: JobSection.DD,
            status: ChecklistItemStatus.Disabled
          },
          {
            id: JobSection.SignOff,
            status: ChecklistItemStatus.Disabled
          }
        );

        return sections;

      })
    )
  }

  private initAppointmentVisit(appointment: Appointment): Observable<AppointmentVisit> {

    console.log('initApppintmentVisit', appointment);

    return selectEntity(this.appointmentVisitsService, appointment.id).pipe(
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
          console.log('Adding appointment visit');
          return this.appointmentVisitsService.add({
            id: appointment.id,
          } as AppointmentVisit);
        }
        console.log('Returning appointmentVisit');
        return of(appointmentVisit);
      }),
      first()
    );
    //
    // return selectOrFetchEntity(this.appointmentVisitsService, appointment.id).pipe(
    //   mergeMap(appointmentVisit => {
    //     if (!appointmentVisit) {
    //       console.log('Adding appointment visit');
    //       return this.appointmentVisitsService.add({
    //         id: appointment.id,
    //       } as AppointmentVisit);
    //     }
    //     console.log('Returning appointmentVisit');
    //     return of(appointmentVisit);
    //   }),
    //   first()
    // )
  }

  private initAppointmentCallTypes(appointment: Appointment) {

    return this.appointmentCallTypesService.entities$.pipe(
      mergeMap(callTypes => {
        const appointmentCallTypes = findByKey(callTypes, 'appointmentId', appointment.id);
        if (appointmentCallTypes?.length > 0) {
          return of(appointmentCallTypes);
        } else {
          return this.appointmentCallTypesService.getWithQuery({
            appointmentId: `${appointment.id}`
          }).pipe(
            catchError(error => throwError(error))
          );
        }
      })
    )
  }

  private initCustomerPlans(appointment: Appointment) {

    return this.customerPlansService.getWithQuery({
      customerId: `${appointment.customerId}`
    });

  }

  private initCustomer(appointment: Appointment) {

    return selectOrFetchEntity(this.customersService, appointment.customerId);

  }

}
