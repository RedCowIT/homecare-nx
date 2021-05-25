import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {Appointment, Job, selectEntity} from "@homecare/shared";
import {ChecklistMenuItem} from "@homecare/common";
import {AppointmentsService} from "@homecare/appointment";
import {Store} from "@ngrx/store";
import {JobState} from "../../store/reducers/job.reducer";
import {getJobMap, getJobs} from "../../store/selectors/job.selectors";
import {Dictionary} from "@ngrx/entity";
import {addJob, removeJob} from "../../store/actions/job.actions";
import {JobService} from "../job/job.service";
import {map, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CurrentJobService {

  appointmentId: number;
  appointmentId$ = new BehaviorSubject<number>(null);

  readonly appointment$: Observable<Appointment>;

  readonly job$: Observable<Job>;

  // readonly menuItems$: Observable<ChecklistMenuItem[]>;

  constructor(private store: Store<JobState>,
              private jobsService: JobService,
              private appointmentsService: AppointmentsService) {

    this.job$ = combineLatest([this.appointmentId$, this.jobsService.entityMap$]).pipe(
      map(([appointmentId, jobMap]) => {
        console.log('job$', appointmentId, jobMap);
        return jobMap[appointmentId];
      })
    );

    this.appointment$ = combineLatest([this.appointmentId$, this.appointmentsService.entityMap$]).pipe(
      map(([appointmentId, appointmentMap]) => {
        console.log('appointment$', appointmentId, appointmentMap);
        return appointmentMap[appointmentId];
      })
    );
  }

  setAppointmentId(appointmentId: number) {
    console.log('setAppointmentId', appointmentId);
    this.jobsService.addJob(appointmentId);
    this.appointmentId = appointmentId;
    this.appointmentId$.next(appointmentId);
  }
}
