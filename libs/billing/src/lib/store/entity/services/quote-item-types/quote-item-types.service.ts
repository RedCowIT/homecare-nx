import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {QuoteItemType} from "@homecare/shared";
import {BillingEntity} from '../../billing.entities';

@Injectable({
  providedIn: 'root'
})
export class QuoteItemTypesService
  extends EntityCollectionServiceBase<QuoteItemType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.QuoteItemType, serviceElementsFactory);

  }

}
