import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {PendingPayment} from "@homecare/shared";
import {BillingEntity} from "../../billing.entities";

@Injectable({
  providedIn: 'root'
})
export class PendingPaymentsService
  extends EntityCollectionServiceBase<PendingPayment> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.PendingPayment, serviceElementsFactory);

  }
}
