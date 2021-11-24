import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {firstItem, InvoiceItemType, QuoteItemType, selectEntityByKey} from "@homecare/shared";
import {BillingEntity} from '../../../billing.entities';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemTypesService
  extends EntityCollectionServiceBase<InvoiceItemType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.InvoiceItemType, serviceElementsFactory);

  }

  selectByDescription(description: string): Observable<InvoiceItemType> {
    return selectEntityByKey(this, 'description', description).pipe(
      map(entities => firstItem(entities))
    );
  }
}
