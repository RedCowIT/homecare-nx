import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {InvoicePayment, selectEntityByKey} from "@homecare/shared";
import {BillingEntity} from '../../../billing.entities';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvoicePaymentsService
  extends EntityCollectionServiceBase<InvoicePayment> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.InvoicePayment, serviceElementsFactory);

  }

  entitiesByInvoiceId(invoiceId: number): Observable<InvoicePayment[]> {
    return selectEntityByKey(this, 'invoiceId', invoiceId);
  }
}
