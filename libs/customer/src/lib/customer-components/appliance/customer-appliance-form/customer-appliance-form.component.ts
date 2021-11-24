import {Component, Input, OnInit} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {
  ApplianceModel,
  CustomerAppliance,
  doesApplianceTypeUseModelLookup,
  Manufacturer,
  selectEntity,
  selectEntityByKey
} from "@homecare/shared";
import {CustomerAppliancesService} from "../../../store/entity/services/customer-appliances/customer-appliances.service";
import {CustomerApplianceFormService} from "../../../services/form/customer-appliance-form/customer-appliance-form.service";
import {ApplianceModelsService, ApplianceTypesService, ManufacturersService} from "@homecare/product";
import {BooleanValue} from "@homecare/common";
import {first, takeUntil, tap} from "rxjs/operators";

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

  constructor(public formService: CustomerApplianceFormService,
              public entityService: CustomerAppliancesService,
              public applianceTypesService: ApplianceTypesService) {

    super(formService, entityService);

    this.groupName = 'appliance';
  }


  ngOnInit() {

    super.ngOnInit();

    this.patchForm({appliance: {id: this.id, customerId: this.customerId}});

  }
}
