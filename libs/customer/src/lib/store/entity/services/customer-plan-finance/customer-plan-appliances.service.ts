import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {CustomerPlanFinance} from "@homecare/shared";
import {CustomerEntity} from "../../customer.entities";

@Injectable({
  providedIn: 'root'
})
export class CustomerPlanFinanceService
  extends EntityCollectionServiceBase<CustomerPlanFinance> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(CustomerEntity.CustomerPlanFinance, serviceElementsFactory);

  }

}
