import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {
  Appointment,
  findIndexWithId,
  firstByKey, Invoice,
  Job,
  JobSection,
  PreJobSection,
  Quote,
  selectEntityByKey
} from "@homecare/shared";
import {AppointmentsService} from "@homecare/appointment";
import {Store} from "@ngrx/store";
import {JobState} from "../../store/reducers/job.reducer";
import {JobService} from "../job/job.service";
import {first, map} from "rxjs/operators";
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

  readonly job$: Observable<Job>;

  readonly preJobSections$: Observable<PreJobSection>;

  readonly quote$: Observable<Quote>;

  readonly invoice$: Observable<Invoice>;

  // readonly menuItems$: Observable<ChecklistMenuItem[]>;

  constructor(private store: Store<JobState>,
              private jobsService: JobService,
              private appointmentsService: AppointmentsService,
              private quotesService: QuotesService,
              private invoicesService: InvoicesService,
              private router: Router) {

    this.job$ = combineLatest([this.appointmentId$, this.jobsService.entityMap$]).pipe(
      map(([appointmentId, jobMap]) => {
        // console.log('job$', appointmentId, jobMap);
        return jobMap[appointmentId];
      })
    );

    this.appointment$ = combineLatest([this.appointmentId$, this.appointmentsService.entityMap$]).pipe(
      map(([appointmentId, appointmentMap]) => {
        // console.log('appointment$', appointmentId, appointmentMap);
        return appointmentMap[appointmentId];
      })
    );

    this.quote$ = combineLatest([this.appointmentId$, this.quotesService.entities$]).pipe(
      map(([appointmentId, quotes]) => {
        return firstByKey(quotes, 'appointmentId', appointmentId);
      })
    );

    this.invoice$ = combineLatest([this.appointmentId$, this.invoicesService.entities$]).pipe(
      map(([appointmentId, invoices]) => {
        return firstByKey(invoices, 'appointmentId', appointmentId);
      })
    );
  }

  setAppointmentId(appointmentId: number) {
    // console.log('setAppointmentId', appointmentId);
    this.jobsService.addJob(appointmentId);
    this.appointmentId = appointmentId;
    this.appointmentId$.next(appointmentId);
  }

  completeJobSection(sectionId: JobSection) {

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
