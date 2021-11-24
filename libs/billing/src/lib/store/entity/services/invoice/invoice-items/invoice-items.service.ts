import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {InvoiceItem, selectEntityByKey} from "@homecare/shared";
import {BillingEntity} from '../../../billing.entities';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemsService
  extends EntityCollectionServiceBase<InvoiceItem> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.InvoiceItem, serviceElementsFactory);

  }

  entitiesByInvoiceId(invoiceId: number): Observable<InvoiceItem[]> {
    return selectEntityByKey(this, 'invoiceId', invoiceId);
  }
}
