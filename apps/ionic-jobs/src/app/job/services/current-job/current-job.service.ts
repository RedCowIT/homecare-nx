import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable, of} from "rxjs";
import {
  Appointment, AppointmentVisit,
  findIndexWithId,
  firstByKey, firstItem, Invoice,
  Job,
  JobSection,
  PreJobSection,
  Quote,
  selectEntityByKey, selectOrFetchEntity, selectOrFetchFirstEntityByKey
} from "@homecare/shared";
import {AppointmentsService, AppointmentVisitsService} from "@homecare/appointment";
import {Store} from "@ngrx/store";
import {JobState} from "../../store/reducers/job.reducer";
import {JobService} from "../job/job.service";
import {filter, first, map, mergeMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {QuoteSection} from "@homecare/shared";
import {InvoicesService, QuotesService} from "@homecare/billing";


@Injectable({
  providedIn: "root"
})
export class CurrentJobService {

  appointmentId: number;
  appointmentId$ = new BehaviorSubject<number>(null);

  readonly appointment$: Observable<Appointment>;

  readonly appointmentVisit$: Observable<AppointmentVisit>;

  readonly job$: Observable<Job>;

  readonly preJobSections$: Observable<PreJobSection>;

  readonly quote$: Observable<Quote>;

  readonly invoice$: Observable<Invoice>;

  // readonly menuItems$: Observable<ChecklistMenuItem[]>;

  constructor(private store: Store<JobState>,
              private jobsService: JobService,
              private appointmentsService: AppointmentsService,
              private appointmentVisitsService: AppointmentVisitsService,
              private quotesService: QuotesService,
              private invoicesService: InvoicesService,
              private router: Router) {

    this.job$ = combineLatest([this.appointmentId$, this.jobsService.entityMap$]).pipe(
      map(([appointmentId, jobMap]) => {
        if (!appointmentId){
          return null;
        }

        return jobMap[appointmentId];
      })
    );

    this.appointment$ = combineLatest([this.appointmentId$, this.appointmentsService.entityMap$]).pipe(
      filter(([appointmentId, appointmentMap]) => !!appointmentId),
      map(([appointmentId, appointmentMap]) => {

        return appointmentMap[appointmentId];
      })
    );

    this.appointmentVisit$ = this.appointmentId$.pipe(
      filter(appointmentId => !!appointmentId),
      mergeMap(appointmentId => selectOrFetchEntity(this.appointmentVisitsService, appointmentId))
    );

    this.quote$ = this.appointmentId$.pipe(
      filter(appointmentId => !!appointmentId),
      mergeMap(appointmentId => selectOrFetchFirstEntityByKey(this.quotesService, 'appointmentId', appointmentId))
    );

    this.invoice$ = this.appointmentId$.pipe(
      filter(appointmentId => !!appointmentId),
      mergeMap(appointmentId => selectOrFetchFirstEntityByKey(this.invoicesService, 'appointmentId', appointmentId))
    );


  }

  addJobError(appointmentId: number){
    if (this.appointmentId === appointmentId){
      this.appointmentId = null;
      this.appointmentId$.next(null);
    }
  }

  setAppointmentId(appointmentId: number) {

    if (this.appointmentId === appointmentId){
      return;
    }

    this.jobsService.addJob(appointmentId);
    this.appointmentId = appointmentId;
    this.appointmentId$.next(appointmentId);
  }

  completeJobSection(sectionId: JobSection) {
    this.jobsService.completeJobSection(this.appointmentId, sectionId);
    this.navToNextJobSection(sectionId);
  }

  completePreJobSection(sectionId: PreJobSection) {
    this.jobsService.completePreJobSection(this.appointmentId, sectionId);
    this.navToNextPreJobSection(sectionId);
  }

  navToNextPreJobSection(fromSectionId: PreJobSection) {
    this.job$.pipe(
      first()
    ).subscribe(async job => {
      const index = findIndexWithId(job.preJobSections, fromSectionId);
      if (index < job.preJobSections.length - 1) {

        const nextPreJobSection = job.preJobSections[index + 1];

        await this.router.navigateByUrl(`/job/${job.appointmentId}/pre-job/${nextPreJobSection.id}`);

      } else {

        await this.router.navigateByUrl(`/job/${job.appointmentId}/quote/${QuoteSection.ApplianceCover}`);

      }
    });
  }

  navToPrevJobSection(fromSectionId: PreJobSection) {
    this.job$.pipe(
      first()
    ).subscribe(async job => {
      const index = findIndexWithId(job.preJobSections, fromSectionId);
      if (index > 0 && job.preJobSections.length) {

        const prevPreJobSection = job.preJobSections[index - 1];

        await this.router.navigateByUrl(`/job/${job.appointmentId}/pre-job/${prevPreJobSection.id}`);

      }
    });
  }

  navToNextJobSection(fromSectionId: JobSection) {
    this.job$.pipe(
      first()
    ).subscribe(async job => {
      const index = findIndexWithId(job.jobSections, fromSectionId);
      if (index < job.jobSections.length - 1) {

        const nextJobSection = job.jobSections[index + 1];

        await this.router.navigateByUrl(`/job/${job.appointmentId}/${nextJobSection.id}`);

      } else {

        await this.router.navigateByUrl(`/main/jobs`);

      }
    });
  }

  completeQuoteSection(sectionId: QuoteSection) {
    this.jobsService.completeQuoteSection(this.appointmentId, sectionId);
    this.navToNextQuoteSection(sectionId);
  }

  navToNextQuoteSection(fromSectionId: QuoteSection) {
    this.job$.pipe(
      first()
    ).subscribe(async job => {
      const index = findIndexWithId(job.quoteSections, fromSectionId);
      if (index < job.quoteSections.length - 1) {

        const nextSection = job.quoteSections[index + 1];

        await this.router.navigateByUrl(`/job/${job.appointmentId}/quote/${nextSection.id}`);

      } else {

        await this.router.navigateByUrl(`/job/${job.appointmentId}/contact`);

      }
    });
  }

  navToPrevQuoteSection(fromSectionId: QuoteSection) {
    this.job$.pipe(
      first()
    ).subscribe(async job => {
      const index = findIndexWithId(job.quoteSections, fromSectionId);
      if (index > 0 && job.quoteSections.length) {

        const prevSection = job.quoteSections[index - 1];

        await this.router.navigateByUrl(`/job/${job.appointmentId}/quote/${prevSection.id}`);

      }
    });
  }
}
