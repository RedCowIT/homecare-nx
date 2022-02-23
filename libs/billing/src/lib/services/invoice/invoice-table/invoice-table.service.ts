import {Injectable, TemplateRef, ViewChild} from '@angular/core';
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {InvoiceItemsService} from "../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {TableSourceService} from "@homecare/common";

@Injectable()
export class InvoiceTableService extends TableSourceService {

  invoiceId: number;

  hasInitialized: boolean;

  constructor(private invoiceItemsService: InvoiceItemsService) {
    super();
  }

  init(invoiceId: number, cellTemplates: { [index: string]: TemplateRef<unknown> }) {

    this.invoiceId = invoiceId;

    this.columns = [
      {prop: 'code', flexGrow: 1},
      {prop: 'description', flexGrow: 4},
      {prop: 'qty', flexGrow: 1},
      {prop: 'unitPrice', name: 'Cost', flexGrow: 1, headerClass: "ion-text-end", cellClass: 'ion-text-end',
      cellTemplate: cellTemplates['value']}
    ];

    this.rows$ = combineLatest([
      this.invoiceItemsService.entities$
    ]).pipe(map(([
                   invoiceItems]) => {

        return invoiceItems.map(invoiceItem => {

          return {
            id: invoiceItem.id,
            code: invoiceItem.productCode,
            description: invoiceItem.description,
            qty: invoiceItem.qty,
            unitPrice: invoiceItem.linegross
          };
        });

      })
    );

    this.hasInitialized = true;
  }

  load() {
    this.invoiceItemsService.getWithQuery({
        'invoiceId': `${this.invoiceId}`
      },
      {
        tag: 'InvoiceTable'
      });
  }
}
