import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {CustomerAppliance} from "@homecare/shared";
import {CustomerAppliancesService} from "../../../store/entity/services/customer-appliances/customer-appliances.service";
import {CustomerApplianceFormService} from "../../../services/form/customer-appliance-form/customer-appliance-form.service";
import {CustomerApplianceTypesService} from "../../../store/entity/services/customer-appliance-types/customer-appliance-types.service";

@Component({
  selector: 'hc-customer-appliance-form',
  templateUrl: './customer-appliance-form.component.html',
  styleUrls: ['./customer-appliance-form.component.scss'],
  providers: [CustomerApplianceFormService]
})
export class CustomerApplianceFormComponent extends EntityFormContainer<CustomerAppliance> implements OnInit {

  @Input()
  id: number;

  @Input()
  customerId: number;

  @Output()
  create = new EventEmitter<CustomerAppliance>();

  @Output()
  update = new EventEmitter<CustomerAppliance>();

  @Output()
  delete = new EventEmitter<CustomerAppliance>();

  constructor(public formService: CustomerApplianceFormService,
              public entityService: CustomerAppliancesService,
              public customerApplianceTypesService: CustomerApplianceTypesService) {

    super(formService, entityService);

    this.groupName = 'appliance';
  }


  ngOnInit() {

    super.ngOnInit();

    console.log('CustomerApplianceFormComponent.patch', {
      appliance: {
        id: this.id,
        customerId: this.customerId,
        form: {...this.formService.form.value}
      }
    });

    this.patchForm({id: this.id, customerId: this.customerId});

  }

  protected patchForm(value: any) {
    super.patchForm(value);
  }
}
