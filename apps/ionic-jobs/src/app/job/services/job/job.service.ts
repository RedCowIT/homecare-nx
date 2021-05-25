import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Appointment, Job, selectEntity} from "@homecare/shared";
import {ChecklistMenuItem} from "@homecare/common";
import {AppointmentsService} from "@homecare/appointment";
import {Store} from "@ngrx/store";
import {JobState} from "../../store/reducers/job.reducer";
import {getJobMap, getJobs} from "../../store/selectors/job.selectors";
import {Dictionary} from "@ngrx/entity";
import {addJob, removeJob} from "../../store/actions/job.actions";

@Injectable({
  providedIn: "root"
})
export class JobService {
  appointmentId: number;
  appointmentId$ = new BehaviorSubject<number>(null);

  readonly appointment$: Observable<Appointment>;
  readonly menuItems$: Observable<ChecklistMenuItem[]>;

  readonly entities$: Observable<Job[]>;
  readonly entityMap$: Observable<Dictionary<Job>>;

  constructor(private store: Store<JobState>,
              private appointmentsService: AppointmentsService) {

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
}
