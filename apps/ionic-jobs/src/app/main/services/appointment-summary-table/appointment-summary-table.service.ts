import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {TableSourceService, toDateRange, withinDateRange} from "@homecare/common";
import * as moment from "moment";
import {AppointmentSummariesService} from "@homecare/appointment";

@Injectable()
export class AppointmentSummaryTableService extends TableSourceService {

  rangeQuery$ = new BehaviorSubject<{ startDate: string, endDate: string } | undefined>(undefined);

  hasInitialized: boolean;

  totalSummary$: Observable<{
    appointmentCount: number,
    jobCount: number,
    quoted: number,
    sales: number,
    plan: number,
    total: number,
    upsell: number,
    planCount: number
  }>;

  constructor(private appointmentSummariesService: AppointmentSummariesService) {
    super();
  }

  init(cellTemplates?: { [index: string]: TemplateRef<unknown> }) {

    this.columns = [
      {prop: 'date', width: 130},
      {prop: 'customer', width: 160},
      {prop: 'jobs', width: 220},
      {prop: 'quoted', width: 110, headerClass: "ion-text-end", cellClass: 'ion-text-end'},
      {prop: 'invoicegross', width: 120, name: 'Invoiced', headerClass: "ion-text-end", cellClass: 'ion-text-end'},
      {prop: 'plans', width: 100, headerClass: "ion-text-end", cellClass: 'ion-text-end'},
      {prop: 'totaltake', width: 100, name: 'Total', headerClass: "ion-text-end", cellClass: 'ion-text-end'},
      {prop: 'upsell', width: 100, headerClass: "ion-text-end", cellClass: 'ion-text-end'},
      {prop: 'plantake', width: 100, name: 'Plans', headerClass: "ion-text-end", cellClass: 'ion-text-end'},
    ];

    this.rows$ = combineLatest([
      this.rangeQuery$,
      this.appointmentSummariesService.entities$
    ]).pipe(map((
        [
          rangeQuery,
          appointmentSummaries
        ]) => {

        return appointmentSummaries.filter(summary => {

          if (!rangeQuery) {
            return false;
          }

          const bookingDate = moment(summary.bookingDateTime, 'DD-MM-YYYY HH:mm');

          return withinDateRange(bookingDate, toDateRange(rangeQuery.startDate, rangeQuery.endDate));

        }).map(summary => {

          return {
            id: summary.id,
            date: summary.bookingDateTime,
            customer: summary.customer,
            jobs: summary.jobs,
            quoted: summary.quoted,
            invoicegross: summary.invoicegross,
            plantake: summary.plantake,
            totaltake: summary.totaltake,
            upsell: summary.upsell,
            plans: summary.plans
          };

        });

      })
    );

    this.totalSummary$ = this.rows$.pipe(map((rows: any[]) => {

      const totalSummary = {
        appointmentCount: 0,
        jobCount: 0,
        quoted: 0,
        sales: 0,
        plan: 0,
        total: 0,
        upsell: 0,
        planCount: 0
      };

      // let uniqueCustomers = new Set<string>();

      for (const row of rows){
        totalSummary.appointmentCount++;
        totalSummary.jobCount++;
        totalSummary.quoted += row.quoted;
        totalSummary.sales += row.invoicegross;
        totalSummary.plan += row.plantake;
        totalSummary.total += row.totaltake;
        totalSummary.upsell += row.upsell;
        totalSummary.planCount += row.plans;
      }

      // totalSummary.

      return totalSummary;

    }));

    this.hasInitialized = true;
  }

  load(rangeQuery?: { startDate: string, endDate: string }) {

    this.rangeQuery$.next(rangeQuery);

    this.appointmentSummariesService.getWithQuery(
      {
        startDate: rangeQuery.startDate, endDate: rangeQuery.endDate
      });
  }
}
