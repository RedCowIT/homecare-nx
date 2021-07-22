import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {QuoteApplianceDetail} from "@homecare/shared";
import {BillingEntity} from '../../billing.entities';

@Injectable({
  providedIn: 'root'
})
export class QuoteApplianceDetailsService
  extends EntityCollectionServiceBase<QuoteApplianceDetail> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.QuoteApplianceDetail, serviceElementsFactory);

  }

}
