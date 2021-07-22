import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuoteApplianceDetailFormComponent} from './quote/quote-appliance-detail-form/quote-appliance-detail-form.component';
import {QuoteApplianceDetailModalComponent} from './quote/quote-appliance-detail-modal/quote-appliance-detail-modal.component';
import {IonicModule} from "@ionic/angular";
import {IonicCommonComponentsModule} from "@homecare/ionic-common";
import {ReactiveFormsModule} from "@angular/forms";
import { QuoteTableComponent } from './quote/quote-table/quote-table.component';
import {CommonComponentsModule} from "../../../../common/src/lib/components/common-components.module";


@NgModule({
  declarations: [
    QuoteApplianceDetailFormComponent,
    QuoteApplianceDetailModalComponent,
    QuoteTableComponent
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
