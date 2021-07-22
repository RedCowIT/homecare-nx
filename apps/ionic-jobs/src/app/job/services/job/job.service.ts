import {Injectable} from "@angular/core";
import {combineLatest, Observable} from "rxjs";
import {
  Appointment,
  CallType,
  CallTypeClassDescription,
  Job,
  JobSection,
  PreJobSection,
  QuoteSection,
  selectEntity,
  selectEntityByKey
} from "@homecare/shared";
import {
  AppointmentCallTypesService,
  AppointmentsService,
  CallTypeClassesService,
  CallTypesService
} from "@homecare/appointment";
import {Store} from "@ngrx/store";
import {JobState} from "../../store/reducers/job.reducer";
import {getJobMap, getJobs} from "../../store/selectors/job.selectors";
import {Dictionary} from "@ngrx/entity";
import {addJob, completeJobSection, removeJob} from "../../store/actions/job.actions";
import {map} from "rxjs/operators";
import {completePreJobSection} from "../../store/actions/pre-job.actions";
import {completeQuoteSection} from "../../store/actions/quote.actions";

@Injectable({
  providedIn: "root"
})
export class JobService {
  // appointmentId: number;
  // appointmentId$ = new BehaviorSubject<number>(null);
  //
  // readonly appointment$: Observable<Appointment>;
  // readonly menuItems$: Observable<ChecklistMenuItem[]>;

  readonly entities$: Observable<Job[]>;
  readonly entityMap$: Observable<Dictionary<Job>>;

  constructor(private store: Store<JobState>,
              private appointmentsService: AppointmentsService,
              private appointmentCallTypesService: AppointmentCallTypesService,
              private callTypesService: CallTypesService,
              private callTypeClassesService: CallTypeClassesService) {

    this.entities$ = this.store.select(getJobs);
    this.entityMap$ = this.store.select(getJobMap);

  }

  addJob(appointmentId: number) {
    this.store.dispatch(addJob({appointmentId}));
  }

  removeJob(appointmentId: number) {
    this.store.dispatch(removeJob({appointmentId}));
  }

  selectAppointment(appointmentId: number): Observable<Appointment> {
    return selectEntity(this.appointmentsService, appointmentId);
  }

  isNCOOnly(appointmentId: number): Observable<boolean> {

    return combineLatest([
      selectEntityByKey(this.appointmentCallTypesService, 'appointmentId', appointmentId),
      this.callTypesService.entityMap$,
      this.callTypeClassesService.entityMap$
    ]).pipe(
      map(([appointmentCallTypes, callTypeMap, callTypeClasses]) => {

        for (const appointmentCallType of appointmentCallTypes) {
          const callType = callTypeMap[appointmentCallType.callTypeId];

          if (!callType) {
            return false;
          }

          const callTypeClass = callTypeClasses[callType.callTypeClassId];

          if (!callTypeClass) {
            return false;
          }

          if (callTypeClass.description !== CallTypeClassDescription.NCO) {
            return false;
          }

        }

        return true;
      })
    )
  }

  selectAppointmentCallTypes(appointmentId: number): Observable<CallType[]> {
    return combineLatest([
      selectEntityByKey(this.appointmentCallTypesService, 'appointmentId', appointmentId),
      this.callTypesService.entityMap$
    ]).pipe(
      map(([appointmentCallTypes, callTypeMap]) => {
        return appointmentCallTypes.map(appointmentCallType => callTypeMap[appointmentCallType.callTypeId]);
      })
    )
  }

  completeJobSection(appointmentId: number, sectionId: JobSection) {
    this.store.dispatch(completeJobSection({
      appointmentId, sectionId
    }));
  }

  completePreJobSection(appointmentId: number, sectionId: PreJobSection) {
    this.store.dispatch(completePreJobSection({
      appointmentId, sectionId
    }));
  }

  completeQuoteSection(appointmentId: number, sectionId: QuoteSection) {
    this.store.dispatch(completeQuoteSection({
      appointmentId, sectionId
    }));
  }
}
