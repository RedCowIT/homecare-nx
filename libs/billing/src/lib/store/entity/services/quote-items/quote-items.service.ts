import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {QuoteItem, selectEntityByKey} from "@homecare/shared";
import {BillingEntity} from '../../billing.entities';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuoteItemsService
  extends EntityCollectionServiceBase<QuoteItem> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.QuoteItem, serviceElementsFactory);

  }

  entitiesByQuoteId(quoteId: number): Observable<QuoteItem[]> {
    return selectEntityByKey(this, 'quoteId', quoteId);
  }

}
