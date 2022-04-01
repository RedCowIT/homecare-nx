import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {DirectDebitDetails} from "@homecare/shared";
import {CustomerEntity} from "../../customer.entities";


@Injectable({
  providedIn: 'root'
})
export class DirectDebitDetailsService
  extends EntityCollectionServiceBase<DirectDebitDetails> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(CustomerEntity.DirectDebitDetails, serviceElementsFactory);

  }

}
