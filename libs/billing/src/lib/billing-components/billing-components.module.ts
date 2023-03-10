import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuoteApplianceDetailFormComponent} from './quote/quote-appliance-detail-form/quote-appliance-detail-form.component';
import {QuoteApplianceDetailModalComponent} from './quote/quote-appliance-detail-modal/quote-appliance-detail-modal.component';
import {IonicModule} from "@ionic/angular";
import {IonicCommonComponentsModule} from "@homecare/ionic-common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuoteTableComponent} from './quote/quote-table/quote-table.component';
import {CommonComponentsModule} from "../../../../common/src/lib/components/common-components.module";
import {QuoteProductDetailFormComponent} from './quote/quote-product-detail-form/quote-product-detail-form.component';
import {QuoteProductDetailModalComponent} from './quote/quote-product-detail-modal/quote-product-detail-modal.component';
import {QuotePlanDetailModalComponent} from './quote/quote-plan-detail-modal/quote-plan-detail-modal.component';
import {QuotePlanDetailFormComponent} from './quote/quote-plan-detail-form/quote-plan-detail-form.component';
import {InvoiceNotesFormComponent} from './invoice/invoice-notes-form/invoice-notes-form.component';
import {InvoiceTableComponent} from './invoice/invoice-table/invoice-table.component';
import {SharedComponentsModule} from "@homecare/shared";
import {AddInvoiceItemButtonComponent} from './invoice/add-invoice-item-button/add-invoice-item-button.component';
import {InvoiceItemModalComponent} from './invoice/invoice-item-modal/invoice-item-modal.component';
import {ProductComponentsModule} from "../../../../product/src/lib/product-components/product-components.module";
import {ProductInvoiceItemFormComponent} from "./invoice/invoice-items/product-invoice-item-form/product-invoice-item-form.component";
import {CustomerPlanInvoiceItemFormComponent} from "./invoice/invoice-items/customer-plan-invoice-item-form/customer-plan-invoice-item-form.component";
import {PlanComponentsModule} from "../../../../plan/src/lib/plan-components/plan-components.module";
import {AppliancePlanInvoiceItemFormComponent} from './invoice/invoice-items/appliance-plan-invoice-item-form/appliance-plan-invoice-item-form.component';
import {CustomerPlanInvoiceItemBaseComponent} from './invoice/invoice-items/customer-plan-invoice-item-base/customer-plan-invoice-item-base.component';
import {InvoicePaymentFormComponent} from './invoice/invoice-payment-form/invoice-payment-form.component';
import {GlobalPaymentRequestFormComponent} from './payment/global-payment-request-form/global-payment-request-form.component';
import {GlobalPaymentModalComponent} from './payment/global-payment-modal/global-payment-modal.component';
import {InvoiceListTableComponent} from './invoice/invoice-list-table/invoice-list-table.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FinancePlanInvoiceItemFormComponent} from './invoice/invoice-items/finance-plan-invoice-item-form/finance-plan-invoice-item-form.component';
import {InvoicePaymentItemListComponent} from './invoice-payment-item-list/invoice-payment-item-list.component';
import {InvoicePaymentModalComponent} from './invoice-payment-modal/invoice-payment-modal.component';
import { EmailInvoiceModalComponent } from './invoice/email-invoice-modal/email-invoice-modal.component';
import { EmailInvoiceFormComponent } from './invoice/email-invoice-form/email-invoice-form.component';
import { GlobalPaymentEmbedComponent } from './payment/global-payment-embed/global-payment-embed.component';
import { CardPaymentListComponent } from './card-payment/card-payment-list/card-payment-list.component';
import { PendingPaymentsTableComponent } from './pending-payment/pending-payments-table/pending-payments-table.component';
import { PendingPaymentSummaryComponent } from './pending-payment/pending-payment-summary/pending-payment-summary.component';


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
    InvoicePaymentFormComponent,
    GlobalPaymentRequestFormComponent,
    GlobalPaymentModalComponent,
    InvoiceListTableComponent,
    FinancePlanInvoiceItemFormComponent,
    InvoicePaymentItemListComponent,
    InvoicePaymentModalComponent,
    EmailInvoiceModalComponent,
    EmailInvoiceFormComponent,
    GlobalPaymentEmbedComponent,
    CardPaymentListComponent,
    PendingPaymentsTableComponent,
    PendingPaymentSummaryComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicCommonComponentsModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    SharedComponentsModule,
    ProductComponentsModule,
    PlanComponentsModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    QuoteApplianceDetailModalComponent,
    QuoteApplianceDetailFormComponent,
    QuoteTableComponent,
    InvoiceTableComponent,
    InvoiceNotesFormComponent,
    InvoicePaymentFormComponent,
    InvoiceListTableComponent,
    InvoicePaymentItemListComponent,
    GlobalPaymentRequestFormComponent,
    EmailInvoiceModalComponent,
    CardPaymentListComponent,
    PendingPaymentsTableComponent
  ]
})
export class BillingComponentsModule {
}
