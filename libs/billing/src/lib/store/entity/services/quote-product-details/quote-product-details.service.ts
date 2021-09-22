import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {QuoteProductDetail} from "@homecare/shared";
import {BillingEntity} from '../../billing.entities';

@Injectable({
  providedIn: 'root'
})
export class QuoteProductDetailsService
  extends EntityCollectionServiceBase<QuoteProductDetail> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.QuoteProductDetail, serviceElementsFactory);

  }

}
