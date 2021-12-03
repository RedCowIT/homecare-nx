import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {InvoiceStatus} from "@homecare/shared";
import {BillingEntity} from '../../../billing.entities';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStatusesService
  extends EntityCollectionServiceBase<InvoiceStatus> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.InvoiceStatus, serviceElementsFactory);

  }
}
