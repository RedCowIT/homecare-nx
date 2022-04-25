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
import {ProductsResolver} from "../../resolvers/products.resolver";
import {SignOffComponent} from "../../job-components/sign-off/sign-off/sign-off.component";
import {PreJobShampooReportComponent} from "../../job-components/pre-job/pre-job-shampoo-report/pre-job-shampoo-report.component";
import {PreJobPoliciesComponent} from "../../job-components/pre-job/pre-job-policies/pre-job-policies.component";
import {JobPaymentComponent} from "../../job-components/job-payment/job-payment.component";
import {JobFinanceComponent} from "../../job-components/job-finance/job-finance.component";
import {JobDirectDebitComponent} from "../../job-components/job-direct-debit/job-direct-debit.component";
import {QuoteUnacceptedResolver} from "../../resolvers/quote-unaccepted.resolver";
import {QuoteLockedComponent} from "../../job-components/quote/quote-locked/quote-locked.component";
import {PreJobOvenReportComponent} from "../../job-components/pre-job/pre-job-oven-report/pre-job-oven-report.component";
import {JobPlanChangeComponent} from "../../job-components/job-plan-change/job-plan-change.component";

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
            path: 'clean',
            component: PreJobOvenReportComponent
          },
          {
            path: 'shampoo',
            component: PreJobShampooReportComponent
          },
          {
            path: 'vacuum',
            component: PreJobVacuumReportComponent
          },
          {
            path: 'policies',
            component: PreJobPoliciesComponent
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
            component: QuoteApplianceCoverComponent,
            resolve: [QuoteUnacceptedResolver]
          },
          {
            path: 'products',
            component: QuoteProductsComponent,
            resolve: [ProductsResolver]
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
        path: 'quote-complete',
        component: QuoteLockedComponent
      },
      {
        path: 'contact',
        component: JobCustomerContactComponent,
      },
      {
        path: 'invoice',
        component: JobInvoiceComponent,
      },
      {
        path: 'finance',
        component: JobFinanceComponent
      },
      {
        path: 'payment',
        component: JobPaymentComponent,
      },
      {
        path: 'dd',
        component: JobDirectDebitComponent,
      },
      {
        path: 'plan-change',
        component: JobPlanChangeComponent
      },
      {
        path: 'sign-off',
        component: SignOffComponent,
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
