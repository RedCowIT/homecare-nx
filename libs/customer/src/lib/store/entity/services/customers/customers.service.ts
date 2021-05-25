import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Customer} from "@homecare/shared";
import {CustomerEntity} from "../../customer.entities";

@Injectable({
  providedIn: 'root'
})
export class CustomersService
  extends EntityCollectionServiceBase<Customer> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(CustomerEntity.Customer, serviceElementsFactory);

  }

}
