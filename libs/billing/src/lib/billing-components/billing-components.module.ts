import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuoteApplianceDetailFormComponent} from './quote/quote-appliance-detail-form/quote-appliance-detail-form.component';
import {QuoteApplianceDetailModalComponent} from './quote/quote-appliance-detail-modal/quote-appliance-detail-modal.component';
import {IonicModule} from "@ionic/angular";
import {IonicCommonComponentsModule} from "@homecare/ionic-common";
import {ReactiveFormsModule} from "@angular/forms";
import { QuoteTableComponent } from './quote/quote-table/quote-table.component';
import {CommonComponentsModule} from "../../../../common/src/lib/components/common-components.module";
import { QuoteProductDetailFormComponent } from './quote/quote-product-detail-form/quote-product-detail-form.component';
import { QuoteProductDetailModalComponent } from './quote/quote-product-detail-modal/quote-product-detail-modal.component';
import { QuotePlanDetailModalComponent } from './quote/quote-plan-detail-modal/quote-plan-detail-modal.component';
import { QuotePlanDetailFormComponent } from './quote/quote-plan-detail-form/quote-plan-detail-form.component';


@NgModule({
  declarations: [
    QuoteApplianceDetailFormComponent,
    QuoteApplianceDetailModalComponent,
    QuoteTableComponent,
    QuoteProductDetailFormComponent,
    QuoteProductDetailModalComponent,
    QuotePlanDetailModalComponent,
    QuotePlanDetailFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicCommonComponentsModule,
    ReactiveFormsModule,
    CommonComponentsModule
  ],
  exports: [
    QuoteApplianceDetailModalComponent,
    QuoteApplianceDetailFormComponent,
    QuoteTableComponent
  ]
})
export class BillingComponentsModule {
}
