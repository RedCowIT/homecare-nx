import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {CardPayment, selectEntityByKey} from "@homecare/shared";
import {Observable} from "rxjs";
import {BillingEntity} from "../../billing.entities";

@Injectable({
  providedIn: 'root'
})
export class CardPaymentsService
  extends EntityCollectionServiceBase<CardPayment> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.CardPayment, serviceElementsFactory);

  }

  appointmentPayments(appointmentId: number): Observable<CardPayment[]> {
    return selectEntityByKey(this, 'appointmentId', appointmentId);
  }
}
