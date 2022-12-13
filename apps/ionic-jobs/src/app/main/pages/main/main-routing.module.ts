import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPage} from './main.page';
import {JobsComponent} from "../../main-components/jobs/jobs/jobs.component";
import {MessagesComponent} from "../../main-components/messages/messages/messages.component";
import {DocsComponent} from "../../main-components/docs/docs/docs.component";
import {MyStockComponent} from "../../main-components/my-stock/my-stock/my-stock.component";
import {AppointmentSummaryComponent} from "../../main-components/appointment-summary/appointment-summary/appointment-summary.component";
import {PaymentsComponent} from "../../main-components/payments/payments/payments.component";
import {InvoicesComponent} from "../../main-components/invoices/invoices/invoices.component";

const routes: Routes = [
  {
    path: '',
    component: MainPage,

    children: [
      {
        path: 'jobs',
        component: JobsComponent
      },
      {
        path: 'stock',
        component: MyStockComponent
      },
      {
        path: 'appointment-summary',
        component: AppointmentSummaryComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      },
      {
        path: 'invoices',
        component: InvoicesComponent
      },
      {
        path: 'docs',
        component: DocsComponent
      },
      {
        path: 'messages',
        component: MessagesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
