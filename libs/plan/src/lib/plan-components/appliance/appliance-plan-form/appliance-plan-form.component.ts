import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {BooleanValue} from "@homecare/common";
import {ApplianceTypesService} from "@homecare/product";
import {map, takeUntil} from "rxjs/operators";
import {SubscribedContainer} from "@homecare/shared";

@Component({
  selector: 'hc-appliance-plan-form',
  templateUrl: './appliance-plan-form.component.html',
  styleUrls: ['./appliance-plan-form.component.scss']
})
export class AppliancePlanFormComponent extends SubscribedContainer implements OnInit, OnChanges {

  @Input()
  formGroup: FormGroup;

  @Input()
  formGroupNameKey: string;

  @Input()
  hideTypeSelect = false;

  applianceTypeId$ = new BehaviorSubject<number>(null);

  showFuelType$: Observable<BooleanValue>;

  showTumbleDryerType$: Observable<BooleanValue>;

  constructor(public applianceTypesService: ApplianceTypesService) {
    super();
  }

  ngOnInit() {
    if (this.formGroup && this.formGroupNameKey) {

      this.showFuelType$ = combineLatest([
        this.applianceTypeId$,
        this.applianceTypesService.entityMap$
      ]).pipe(map(([applianceTypeId, applianceTypeMap]) => {

        return {
          value: applianceTypeMap[applianceTypeId]?.type === 'FUELED'
        };
      }));

      this.showTumbleDryerType$ = combineLatest([
        this.applianceTypeId$,
        this.applianceTypesService.entityMap$
      ]).pipe(map(([applianceTypeId, applianceTypeMap]) => {

        return {
          value: applianceTypeMap[applianceTypeId]?.type === 'TUMBLEDRYER'
        };
      }));

      const group = this.getApplianceGroup();

      const applianceTypeId = group?.value?.applianceTypeId;
      this.applianceTypeId$.next(applianceTypeId);

      group.valueChanges.pipe(
        takeUntil(this.destroyed$)
      ).subscribe(value => {
        this.applianceTypeId$.next(value?.applianceTypeId);
      });

      combineLatest([
        group.get('applianceTypeId').valueChanges,
        this.applianceTypesService.entityMap$
      ]).pipe(
        takeUntil(this.destroyed$)
      ).subscribe(([applianceTypeId, applianceTypeMap]) => {
        if (applianceTypeId) {
          const applianceType = applianceTypeMap[applianceTypeId];

          console.log('Found appliance type', applianceType);

          if (applianceType.type !== 'TUMBLEDRYER') {
            group.patchValue({
              tumbleDryerTypeId: null
            }, {
              emitEvent: false
            });
          }
          if (applianceType.type !== 'FUELED') {
            group.patchValue({
              fuelTypeId: null
            }, {
              emitEvent: false
            });
          }

          if (applianceType.type === 'TUMBLEDRYER') {
            group.controls['tumbleDryerTypeId'].setValidators([Validators.required]);
          } else {
            group.controls['tumbleDryerTypeId'].clearValidators();
          }

          if (applianceType.type === 'FUELED') {
            group.controls['fuelTypeId'].setValidators([Validators.required]);
          } else {
            group.controls['fuelTypeId'].clearValidators();
          }

          group.controls['tumbleDryerTypeId'].updateValueAndValidity();
          group.controls['fuelTypeId'].updateValueAndValidity();
        }

      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  public getApplianceGroup(): FormGroup {
    return this.formGroup.controls[this.formGroupNameKey] as FormGroup;
  }
}
