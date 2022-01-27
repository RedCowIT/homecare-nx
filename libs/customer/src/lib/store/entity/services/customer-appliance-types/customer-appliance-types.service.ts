import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {CustomerEntity} from "../../customer.entities";
import {CustomerApplianceType} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class CustomerApplianceTypesService
  extends EntityCollectionServiceBase<CustomerApplianceType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(CustomerEntity.CustomerApplianceType, serviceElementsFactory);

  }

}
