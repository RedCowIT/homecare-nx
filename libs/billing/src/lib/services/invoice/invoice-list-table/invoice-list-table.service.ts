import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject, combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {TableSourceService, toDateRange, withinDateRange} from "@homecare/common";
import {InvoicesService} from "../../../store/entity/services/invoice/invoices/invoices.service";
import {InvoiceStatusesService} from "../../../store/entity/services/invoice/invoice-statuses/invoice-statuses.service";
import * as moment from "moment";

@Injectable()
export class InvoiceListTableService extends TableSourceService {

  appointmentId: number;

  hasInitialized: boolean;

  rangeQuery$ = new BehaviorSubject<{ startDate: string, endDate: string } | undefined>(undefined);

  constructor(private invoicesService: InvoicesService,
              private invoiceStatusesService: InvoiceStatusesService) {
    super();
  }

  init(appointmentId?: number, cellTemplates?: { [index: string]: TemplateRef<unknown> }) {

    this.appointmentId = appointmentId;

    this.columns = [
      {prop: 'invoiceNumber', flexGrow: 1},
      {prop: 'status', flexGrow: 1},
      {prop: 'invoiceDate', flexGrow: 1},
      {prop: 'grossAmount', name: 'Gross', flexGrow: 1, headerClass: "ion-text-end", cellClass: 'ion-text-end',
        cellTemplate: cellTemplates['value']}
    ];

    this.rows$ = combineLatest([
      this.invoicesService.entities$,
      this.invoiceStatusesService.entityMap$,
      this.rangeQuery$
    ]).pipe(map(([
                   invoices, invoiceStatusMap, rangeQuery]) => {

        if (this.appointmentId) {
          invoices = invoices.filter(invoice => invoice.appointmentId === this.appointmentId);
        }

        if (rangeQuery){
          invoices = invoices.filter(invoice => {

            const date = moment(invoice.invoiceDate);

            return withinDateRange(date, toDateRange(rangeQuery.startDate, rangeQuery.endDate));

          });
        }

        return invoices.map(invoice => {

          return {
            id: invoice.id,
            invoiceNumber: invoice.invoiceNumber,
            status: invoiceStatusMap[invoice.invoiceStatusId].description,
            invoiceDate: moment(invoice.invoiceDate).format('DD-MM-YYYY'),
            grossAmount: invoice.grossAmount
          };

        });

      })
    );

    this.hasInitialized = true;
  }

  load(rangeQuery?: { startDate: string, endDate: string }) {

    if (rangeQuery){
      this.rangeQuery$.next(rangeQuery);

      this.invoicesService.getWithQuery(
        {
          fromDate: rangeQuery.startDate, endDate: rangeQuery.endDate
        });
    }
  }
}
