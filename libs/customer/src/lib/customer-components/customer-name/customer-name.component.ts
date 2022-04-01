import {Component, Input, OnInit} from '@angular/core';
import {Customer, EntityContainer} from "@homecare/shared";
import {CustomersService} from "../../store/entity/services/customers/customers.service";

@Component({
  selector: 'hc-customer-name',
  templateUrl: './customer-name.component.html',
  styleUrls: ['./customer-name.component.scss']
})
export class CustomerNameComponent extends EntityContainer<Customer> implements OnInit {

  @Input()
  id: number;

  constructor(protected customersService: CustomersService) {
    super(customersService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
