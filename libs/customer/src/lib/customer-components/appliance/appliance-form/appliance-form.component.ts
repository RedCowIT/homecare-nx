import {Component, Input, OnInit} from '@angular/core';

import {AbstractControl, FormGroup} from "@angular/forms";
import {first, takeUntil, tap} from "rxjs/operators";
import {
  ApplianceModel, doesCustomerApplianceTypeUseModelLookup,
  Manufacturer,
  selectEntity,
  selectEntityByKey,
  SubscribedContainer
} from "@homecare/shared";
import {BooleanValue} from "@homecare/common";
import {CustomerApplianceTypesService} from "../../../store/entity/services/customer-appliance-types/customer-appliance-types.service";
import {ApplianceModelsService, ManufacturersService} from "@homecare/product";


@Component({
  selector: 'hc-appliance-form',
  templateUrl: './appliance-form.component.html',
  styleUrls: ['./appliance-form.component.scss']
})
export class ApplianceFormComponent extends SubscribedContainer implements OnInit {

  @Input()
  form: FormGroup;

  @Input()
  groupName: string;

  usesModelLookup: BooleanValue; // some appliance types use free text for manufacturer model

  manufacturers: Manufacturer[];

  applianceModels: ApplianceModel[];

  constructor(public customerApplianceTypesService: CustomerApplianceTypesService,
              public applianceModelsService: ApplianceModelsService,
              public manufacturersService: ManufacturersService) {
    super();
  }

  ngOnInit() {
    
    this.updateSelects();

    this.form.valueChanges.pipe(
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
    const applianceTypeId = this.getControl('applianceTypeId').value;

    if (!applianceTypeId) {
      this.usesModelLookup = null;
      return;
    }

    selectEntity(this.customerApplianceTypesService, applianceTypeId).pipe(first()).subscribe(applianceType => {
      this.usesModelLookup = {value: doesCustomerApplianceTypeUseModelLookup(applianceType)};
    });
  }

  private updateManufacturers() {
    const applianceTypeId = this.getControl('applianceTypeId').value;

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
    const manufacturerId = this.getControl('manufacturerId').value;

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

  private getControl(key: string): AbstractControl {
    return this.form.get(this.groupName).get(key);
  }
}
