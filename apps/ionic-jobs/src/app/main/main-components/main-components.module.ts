import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainTabsComponent} from './main-tabs/main-tabs.component';
import {IonicModule} from "@ionic/angular";
import {MainSideNavComponent} from './main-side-nav/main-side-nav.component';
import {RouterModule} from "@angular/router";
import {JobsComponent} from './jobs/jobs/jobs.component';
import {AppointmentComponentsModule} from "@homecare/appointment";
import {MessagesComponent} from './messages/messages/messages.component';
import {DocsComponent} from './docs/docs/docs.component';
import {AuthComponentsModule} from "../../auth/components/auth-components.module";
import {StoreLogsComponent} from './store-logs/store-logs.component';
import {IonicCommonComponentsModule} from "@homecare/ionic-common";
import {InvoicesComponent} from './invoices/invoices/invoices.component';
import {PaymentsComponent} from './payments/payments/payments.component';
import {AppointmentSummaryComponent} from './appointment-summary/appointment-summary/appointment-summary.component';
import {MyStockComponent} from './my-stock/my-stock/my-stock.component';
import {FormsModule} from "@angular/forms";
import {ProductComponentsModule} from "../../../../../../libs/product/src/lib/product-components/product-components.module";
import {AppointmentSummaryTableComponent} from './appointment-summary/appointment-summary-table/appointment-summary-table.component';
import {CommonComponentsModule} from "../../../../../../libs/common/src/lib/components/common-components.module";
import {BillingComponentsModule} from "../../../../../../libs/billing/src/lib/billing-components/billing-components.module";


@NgModule({
  declarations: [
    MainTabsComponent,
    MainSideNavComponent,
    JobsComponent,
    MessagesComponent,
    DocsComponent,
    StoreLogsComponent,
    InvoicesComponent,
    PaymentsComponent,
    AppointmentSummaryComponent,
    MyStockComponent,
    AppointmentSummaryTableComponent
  ],
  exports: [
    MainTabsComponent,
    MainSideNavComponent,
    StoreLogsComponent,
    BillingComponentsModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    AppointmentComponentsModule,
    AuthComponentsModule,
    IonicCommonComponentsModule,
    FormsModule,
    ProductComponentsModule,
    CommonComponentsModule
  ]
})
export class MainComponentsModule {
}
