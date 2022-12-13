import {Injectable, TemplateRef} from "@angular/core";
import {TableSourceService, toDateRange, withinDateRange} from "@homecare/common";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import * as moment from "moment";
import {PendingPaymentsService} from "../../../store/entity/services/pending-payment/pending-payments.service";
import {first, map} from "rxjs/operators";
import {InvoicePaymentTypes, removeMissingFromCache} from "@homecare/shared";

@Injectable()
export class PendingPaymentTableService extends TableSourceService {

  rangeQuery$ = new BehaviorSubject<{ startDate: string, endDate: string } | undefined>(undefined);

  hasInitialized: boolean;


  public summary$: Observable<{
    pendingCard: {
      count: number,
      amount: number
    },
    pendingCash: {
      count: number,
      amount: number
    },
    pendingCheque: {
      count: number,
      amount: number
    },
    total: {
      count: number,
      amount: number
    }
  }>

  constructor(private pendingPaymentsService: PendingPaymentsService) {
    super();
  }

  init(cellTemplates?: { [index: string]: TemplateRef<unknown> }) {

    this.columns = [
      {prop: 'invoiceNumber', flexGrow: 1, name: 'No.'},
      {prop: 'date', flexGrow: 1},
      {prop: 'type', flexGrow: 1},
      {prop: 'amount', flexGrow: 1, headerClass: "ion-text-end", cellClass: 'ion-text-end'},
      {prop: 'total', flexGrow: 1, name: 'Total', headerClass: "ion-text-end", cellClass: 'ion-text-end'}
    ];

    this.rows$ = combineLatest([
      this.rangeQuery$,
      this.pendingPaymentsService.entities$
    ]).pipe(map((
        [
          rangeQuery,
          pendingPayments
        ]) => {

        return pendingPayments.filter(payment => {

          if (!rangeQuery) {
            return false;
          }

          const bookingDate = moment(payment.invoiceDate, 'DD-MM-YYYY HH:mm');

          return withinDateRange(bookingDate, toDateRange(rangeQuery.startDate, rangeQuery.endDate));

        }).map(payment => {

          return {
            id: payment.id,
            invoiceNumber: payment.invoiceNumber,
            date: payment.invoiceDate,
            type: payment.paymentType,
            amount: payment.amount,
            total: payment.invoiceAmount
          };

        });

      })
    );


    this.summary$ = this.rows$.pipe(map(
      (rows: Array<{id: number, type: string, amount: string}>) => {
        const summary = {
          pendingCard: {
            count: 0,
            amount: 0
          },
          pendingCash: {
            count: 0,
            amount: 0
          },
          pendingCheque: {
            count: 0,
            amount: 0
          },
          total: {
            count: 0,
            amount: 0
          }
        };

        for (const row of rows){
          switch (row.type){
            case InvoicePaymentTypes.PendingCard:
              summary.pendingCard.count++;
              summary.pendingCard.amount += parseFloat(row.amount)
              break;
            case InvoicePaymentTypes.PendingCash:
              summary.pendingCash.count++;
              summary.pendingCash.amount += parseFloat(row.amount)
              break;
            case InvoicePaymentTypes.PendingCheque:
              summary.pendingCheque.count++;
              summary.pendingCheque.amount += parseFloat(row.amount)
              break;
          }
          summary.total.count++;
          summary.total.amount += parseFloat(row.amount);
        }

        return summary;
      }
    ));

    this.hasInitialized = true;
  }

  load(rangeQuery?: { startDate: string, endDate: string }) {

    this.rangeQuery$.next(rangeQuery);

    this.pendingPaymentsService.getWithQuery(
      {
        startDate: rangeQuery.startDate, endDate: rangeQuery.endDate
      }).pipe(first()).subscribe(pendingPayments => {
        removeMissingFromCache(this.pendingPaymentsService, pendingPayments);
        return null;
    });
  }

}
