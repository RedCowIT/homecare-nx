import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {CustomerPlan} from "@homecare/shared";
import {CustomerEntity} from "../../customer.entities";

@Injectable({
  providedIn: 'root'
})
export class CustomerPlansService
  extends EntityCollectionServiceBase<CustomerPlan> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(CustomerEntity.CustomerPlan, serviceElementsFactory);

  }

}
