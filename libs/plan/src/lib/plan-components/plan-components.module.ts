import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanPaymentPeriodSelectComponent } from './plan-payment-period-select/plan-payment-period-select.component';
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import { AppliancePriceRangeSelectComponent } from './appliance/appliance-price-range-select/appliance-price-range-select.component';
import {IonicCommonComponentsModule} from "@homecare/ionic-common";
import { AppliancePlanFormComponent } from './appliance/appliance-plan-form/appliance-plan-form.component';
import { FinancePlanFormComponent } from './finance/finance-plan-form/finance-plan-form.component';



@NgModule({
  declarations: [
    PlanPaymentPeriodSelectComponent,
    AppliancePriceRangeSelectComponent,
    AppliancePlanFormComponent,
    FinancePlanFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    IonicCommonComponentsModule
  ],
  exports: [
    PlanPaymentPeriodSelectComponent,
    AppliancePlanFormComponent,
    FinancePlanFormComponent
  ]
})
export class PlanComponentsModule { }
