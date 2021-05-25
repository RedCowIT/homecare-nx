import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {CustomerAddress} from "@homecare/shared";
import {CustomerEntity} from "../../customer.entities";

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressesService
  extends EntityCollectionServiceBase<CustomerAddress> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(CustomerEntity.CustomerAddress, serviceElementsFactory);

  }

}
