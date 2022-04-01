import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {CustomerPlanFinance, CustomerPlanFinanceDocument} from "@homecare/shared";
import {CustomerEntity} from "../../customer.entities";


@Injectable({
  providedIn: 'root'
})
export class CustomerPlanFinanceDocumentsService
  extends EntityCollectionServiceBase<CustomerPlanFinanceDocument> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(CustomerEntity.CustomerPlanFinanceDocument, serviceElementsFactory);
  }

}
