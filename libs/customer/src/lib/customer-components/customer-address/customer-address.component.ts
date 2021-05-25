import {Component, OnInit} from '@angular/core';
import {CustomerAddress, EntityContainer} from "@homecare/shared";
import {CustomerAddressesService} from "../../store/entity/services/customer-addresses/customer-addresses.service";

@Component({
  selector: 'hc-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss']
})
export class CustomerAddressComponent extends EntityContainer<CustomerAddress> implements OnInit {

  constructor(protected customerAddressesService: CustomerAddressesService) {
    super(customerAddressesService);
  }
}
