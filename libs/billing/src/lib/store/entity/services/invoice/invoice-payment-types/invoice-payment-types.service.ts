import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {InvoicePayment, InvoicePaymentType, selectEntityByKey, selectFirstEntityByKey} from "@homecare/shared";
import {BillingEntity} from '../../../billing.entities';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvoicePaymentTypesService
  extends EntityCollectionServiceBase<InvoicePaymentType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.InvoicePaymentType, serviceElementsFactory);

  }

  selectByDescription(description: string): Observable<InvoicePaymentType> {
    return selectFirstEntityByKey(this, 'description', description);
  }
}
