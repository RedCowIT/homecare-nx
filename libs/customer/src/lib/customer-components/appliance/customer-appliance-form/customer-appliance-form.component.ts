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

  usesModelLookup: BooleanValue; // some appliance types use free text for manufacturer model

  manufacturers: Manufacturer[];

  applianceModels: ApplianceModel[];

  constructor(public formService: CustomerApplianceFormService,
              public entityService: CustomerAppliancesService,
              public applianceTypesService: ApplianceTypesService,
              public manufacturersService: ManufacturersService,
              public applianceModelsService: ApplianceModelsService) {
    super(formService, entityService);
  }


  ngOnInit() {
    super.ngOnInit();
    this.patchForm({customerId: this.customerId});

    this.updateSelects();

    this.formService.form.valueChanges.pipe(
      takeUntil(this.destroyed$),
      tap(() => this.updateSelects())
    ).subscribe();

  }

  private updateSelects() {
    this.updateModelLookup();
    this.updateManufacturers();
    this.updateModels();
  }

  private updateModelLookup() {
    const applianceTypeId = this.formService.form.get('applianceTypeId').value;

    if (!applianceTypeId) {
      this.usesModelLookup = null;
      return;
    }

    selectEntity(this.applianceTypesService, applianceTypeId).pipe(first()).subscribe(applianceType => {
      this.usesModelLookup = {value: doesApplianceTypeUseModelLookup(applianceType)};
    });
  }

  private updateManufacturers() {
    const applianceTypeId = this.formService.form.get('applianceTypeId').value;

    if (!applianceTypeId) {
      this.manufacturers = [];
      return;
    }

    if (this.usesModelLookup) {
      selectEntityByKey(this.manufacturersService, 'applianceTypeId', applianceTypeId).pipe(
        first()
      ).subscribe(manufacturers => {
        this.manufacturers = manufacturers;
      });
    } else {
      this.manufacturers = [];
    }
  }

  private updateModels() {
    const manufacturerId = this.formService.form.get('manufacturerId').value;

    if (!manufacturerId) {
      this.applianceModels = [];
      return;
    }

    selectEntityByKey(this.applianceModelsService, 'manufacturerId', manufacturerId).pipe(
      first()
    ).subscribe(applianceModels => {
      this.applianceModels = applianceModels;
    });

  }

}
