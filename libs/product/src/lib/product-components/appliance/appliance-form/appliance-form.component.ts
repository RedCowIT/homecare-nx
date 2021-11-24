import {Component, Input, OnInit} from '@angular/core';
import {ApplianceModelsService} from "../../../store/entity/services/appliance-models.service";

import {AbstractControl, FormGroup} from "@angular/forms";
import {first, takeUntil, tap} from "rxjs/operators";
import {
  ApplianceModel,
  doesApplianceTypeUseModelLookup,
  Manufacturer,
  selectEntity,
  selectEntityByKey,
  SubscribedContainer
} from "@homecare/shared";
import {BooleanValue} from "@homecare/common";
import {ApplianceTypesService} from "../../../store/entity/services/appliance-types.service";
import {ManufacturersService} from "../../../store/entity/services/manufacturers.service";

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

  constructor(public applianceTypesService: ApplianceTypesService,
              public applianceModelsService: ApplianceModelsService,
              public manufacturersService: ManufacturersService) {
    super();
  }

  ngOnInit() {

    console.log('ApplianceFormCmp', this.form, this.groupName);
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

    selectEntity(this.applianceTypesService, applianceTypeId).pipe(first()).subscribe(applianceType => {
      this.usesModelLookup = {value: doesApplianceTypeUseModelLookup(applianceType)};
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
