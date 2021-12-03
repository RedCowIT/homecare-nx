import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {CustomerAddress, findByKey, firstByKey} from "@homecare/shared";
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

  /**
   * Return default customer address from an array of addresses.
   * If default is not set, returns first customer address matching customer id.
   *
   * @param customerAddresses
   * @param customerId
   */
  getDefaultCustomerAddress(customerAddresses: CustomerAddress[], customerId: number): CustomerAddress {
    const addresses = findByKey(customerAddresses, 'customerId', customerId);

    if (!addresses || addresses.length === 0) {
      return null;
    }

    let address = firstByKey<CustomerAddress>(addresses, 'isDefault', 1);
    if (!address) {
      address = addresses[0];
    }

    return address;

  }
}
