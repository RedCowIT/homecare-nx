import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {InvoiceSummary, selectEntityByKey} from "@homecare/shared";
import {map} from "rxjs/operators";
import {InvoiceItemsService} from "../../../store/entity/services/invoice/invoice-items/invoice-items.service";

@Injectable()
export class InvoiceSummaryService {

  invoiceId: number;

  hasInitialized: boolean;

  invoiceSummary$ = new Observable<InvoiceSummary>();

  constructor(public invoiceItemsService: InvoiceItemsService) {
  }

  init(invoiceId: number) {

    this.invoiceId = invoiceId;

    this.invoiceSummary$ = selectEntityByKey(this.invoiceItemsService, 'invoiceId', this.invoiceId).pipe(
      map(invoiceItems => {

        const summary: InvoiceSummary = {
          invoiceId,
          net: 0,
          vat: 0,
          gross: 0
        };

        for (const invoiceItem of invoiceItems) {
          if (invoiceItem.linenett){
            summary.net += invoiceItem.linenett;
            summary.vat += invoiceItem.linevat;
            summary.gross += invoiceItem.linegross;
          }
        }

        return summary;
      })
    );

    this.hasInitialized = true;
  }
}
