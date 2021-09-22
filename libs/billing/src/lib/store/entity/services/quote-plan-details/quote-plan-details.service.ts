import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {QuotePlanDetail} from "@homecare/shared";
import {BillingEntity} from '../../billing.entities';

@Injectable({
  providedIn: 'root'
})
export class QuotePlanDetailsService
  extends EntityCollectionServiceBase<QuotePlanDetail> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.QuotePlanDetail, serviceElementsFactory);

  }

}
