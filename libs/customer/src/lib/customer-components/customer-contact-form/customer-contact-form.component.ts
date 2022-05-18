import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {Customer} from "@homecare/shared";
import {CustomersService} from "../../store/entity/services/customers/customers.service";
import {CustomerContactFormService} from "../../services/form/customer-contact-form/customer-contact-form.service";

@Component({
  selector: 'hc-customer-contact-form',
  templateUrl: './customer-contact-form.component.html',
  styleUrls: ['./customer-contact-form.component.scss'],
  providers: [CustomerContactFormService]
})
export class CustomerContactFormComponent extends EntityFormContainer<Customer> implements OnInit {

  @Input()
  id: number;

  @Output()
  create = new EventEmitter<Customer>();

  @Output()
  update = new EventEmitter<Customer>();

  @Output()
  delete = new EventEmitter<Customer>();

  public errors: string[];

  constructor(public formService: CustomerContactFormService,
              public entityService: CustomersService) {
    super(formService, entityService);
  }

}
