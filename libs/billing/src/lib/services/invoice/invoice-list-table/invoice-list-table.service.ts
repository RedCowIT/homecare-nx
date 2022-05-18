import {Injectable, TemplateRef} from '@angular/core';
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {TableSourceService} from "@homecare/common";
import {InvoicesService} from "../../../store/entity/services/invoice/invoices/invoices.service";
import {InvoiceStatusesService} from "../../../store/entity/services/invoice/invoice-statuses/invoice-statuses.service";

@Injectable()
export class InvoiceListTableService extends TableSourceService {

  appointmentId: number;

  hasInitialized: boolean;

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
      this.invoiceStatusesService.entityMap$
    ]).pipe(map(([
                   invoices, invoiceStatusMap]) => {

        if (this.appointmentId) {
          invoices = invoices.filter(invoice => invoice.appointmentId === this.appointmentId);
        }

        return invoices.map(invoice => {


          return {
            id: invoice.id,
            invoiceNumber: invoice.invoiceNumber,
            status: invoiceStatusMap[invoice.invoiceStatusId].description,
            invoiceDate: invoice.invoiceDate,
            grossAmount: invoice.grossAmount
          };

        });

      })
    );

    this.hasInitialized = true;
  }

  load() {
    // this.invoicesService.getAll(
    //   {
    //     tag: 'InvoiceListTable'
    //   });
  }
}
