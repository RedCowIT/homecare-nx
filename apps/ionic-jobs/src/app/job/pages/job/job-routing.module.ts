import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {JobPage} from './job.page';
import {JobInfoComponent} from "../../job-components/job-info/job-info.component";
import {CurrentJobResolver} from "../../resolvers/current-job.resolver";
import {JobPreJobComponent} from "../../job-components/job-pre-job/job-pre-job.component";
import {PreJobWorkSummaryComponent} from "../../job-components/pre-job/pre-job-work-summary/pre-job-work-summary.component";
import {PreJobAppliancesComponent} from "../../job-components/pre-job/pre-job-appliances/pre-job-appliances.component";
import {PreJobBeforePhotosComponent} from "../../job-components/pre-job/pre-job-before-photos/pre-job-before-photos.component";
import {PreJobVacuumReportComponent} from "../../job-components/pre-job/pre-job-vacuum-report/pre-job-vacuum-report.component";
import {PreJobSignatureComponent} from "../../job-components/pre-job/pre-job-signature/pre-job-signature.component";
import {QuoteComponent} from "../../job-components/quote/quote/quote.component";
import {QuoteApplianceCoverComponent} from "../../job-components/quote/quote-appliance-cover/quote-appliance-cover.component";
import {JobCustomerContactComponent} from "../../job-components/job-customer-contact/job-customer-contact.component";
import {QuoteProductsComponent} from "../../job-components/quote/quote-products/quote-products.component";
import {QuoteOtherPlansComponent} from "../../job-components/quote/quote-other-plans/quote-other-plans.component";
import {QuoteCompleteComponent} from "../../job-components/quote/quote-complete/quote-complete.component";
import {JobInvoiceComponent} from "../../job-components/job-invoice/job-invoice.component";

const routes: Routes = [
  {
    path: ':id',
    component: JobPage,
    resolve: {
      'appointmentId': CurrentJobResolver
    },
    canActivate: [],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'info'
      },
      {
        path: 'info',
        component: JobInfoComponent
      },
      {
        path: 'pre-job',
        component: JobPreJobComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'work-summary'
          },
          {
            path: 'work-summary',
            component: PreJobWorkSummaryComponent
          },
          {
            path: 'appliances',
            component: PreJobAppliancesComponent
          },
          {
            path: 'before-photos',
            component: PreJobBeforePhotosComponent
          },
          {
            path: 'vacuum',
            component: PreJobVacuumReportComponent
          },
          {
            path: 'signature',
            component: PreJobSignatureComponent
          }
        ]
      },
      {
        path: 'quote',
        component: QuoteComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'appliance-cover'
          },
          {
            path: 'appliance-cover',
            component: QuoteApplianceCoverComponent
          },
          {
            path: 'products',
            component: QuoteProductsComponent
          },
          {
            path: 'other-plans',
            component: QuoteOtherPlansComponent
          },
          {
            path: 'complete-quote',
            component: QuoteCompleteComponent
          }
        ]
      },
      {
        path: 'contact',
        component: JobCustomerContactComponent,
      },
      {
        path: 'invoice',
        component: JobInvoiceComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPageRoutingModule {
}
