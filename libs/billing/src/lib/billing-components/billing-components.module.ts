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
import { InvoiceNotesFormComponent } from './invoice/invoice-notes-form/invoice-notes-form.component';
import { InvoiceTableComponent } from './invoice/invoice-table/invoice-table.component';
import {SharedComponentsModule} from "@homecare/shared";
import { AddInvoiceItemButtonComponent } from './invoice/add-invoice-item-button/add-invoice-item-button.component';
import { InvoiceItemModalComponent } from './invoice/invoice-item-modal/invoice-item-modal.component';
import {ProductComponentsModule} from "../../../../product/src/lib/product-components/product-components.module";
import {ProductInvoiceItemFormComponent} from "./invoice/invoice-items/product-invoice-item-form/product-invoice-item-form.component";
import {CustomerPlanInvoiceItemFormComponent} from "./invoice/invoice-items/customer-plan-invoice-item-form/customer-plan-invoice-item-form.component";
import {PlanComponentsModule} from "../../../../plan/src/lib/plan-components/plan-components.module";
import { AppliancePlanInvoiceItemFormComponent } from './invoice/invoice-items/appliance-plan-invoice-item-form/appliance-plan-invoice-item-form.component';
import { CustomerPlanInvoiceItemBaseComponent } from './invoice/invoice-items/customer-plan-invoice-item-base/customer-plan-invoice-item-base.component';
import { InvoicePaymentFormComponent } from './invoice/invoice-payment-form/invoice-payment-form.component';


@NgModule({
  declarations: [
    QuoteApplianceDetailFormComponent,
    QuoteApplianceDetailModalComponent,
    QuoteTableComponent,
    QuoteProductDetailFormComponent,
    QuoteProductDetailModalComponent,
    QuotePlanDetailModalComponent,
    QuotePlanDetailFormComponent,
    InvoiceNotesFormComponent,
    InvoiceTableComponent,
    AddInvoiceItemButtonComponent,
    InvoiceItemModalComponent,
    ProductInvoiceItemFormComponent,
    CustomerPlanInvoiceItemFormComponent,
    AppliancePlanInvoiceItemFormComponent,
    CustomerPlanInvoiceItemBaseComponent,
    InvoicePaymentFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicCommonComponentsModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    SharedComponentsModule,
    ProductComponentsModule,
    PlanComponentsModule
  ],
  exports: [
    QuoteApplianceDetailModalComponent,
    QuoteApplianceDetailFormComponent,
    QuoteTableComponent,
    InvoiceTableComponent,
    InvoiceNotesFormComponent,
    InvoicePaymentFormComponent
  ]
})
export class BillingComponentsModule {
}
