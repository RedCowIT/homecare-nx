import {Component, OnInit} from '@angular/core';
import {Customer, EntityContainer} from "@homecare/shared";
import {CustomersService} from "../../store/entity/services/customers/customers.service";

@Component({
  selector: 'hc-customer-name',
  templateUrl: './customer-name.component.html',
  styleUrls: ['./customer-name.component.scss']
})
export class CustomerNameComponent extends EntityContainer<Customer> implements OnInit {

  constructor(protected customersService: CustomersService) {
    super(customersService);
  }

}
