import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobInfoComponent} from './job-info/job-info.component';
import {IonicModule} from "@ionic/angular";
import {AppointmentComponentsModule} from "@homecare/appointment";
import {CustomerComponentsModule} from "@homecare/customer";
import {JobSideNavComponent} from './job-side-nav/job-side-nav.component';
import {RouterModule} from "@angular/router";
import {JobBaseComponent} from './job-base/job-base.component';
import {JobPreJobComponent} from './job-pre-job/job-pre-job.component';
import {JobFooterComponent} from './job-footer/job-footer.component';
import {PreJobSideNavComponent} from './pre-job/pre-job-side-nav/pre-job-side-nav.component';
import {PreJobWorkSummaryComponent} from './pre-job/pre-job-work-summary/pre-job-work-summary.component';
import {IonicCommonComponentsModule, SignaturePadModule} from "@homecare/ionic-common";
import {PreJobAppliancesComponent} from './pre-job/pre-job-appliances/pre-job-appliances.component';
import {PreJobBeforePhotosComponent} from './pre-job/pre-job-before-photos/pre-job-before-photos.component';
import {PreJobVacuumReportComponent} from './pre-job/pre-job-vacuum-report/pre-job-vacuum-report.component';
import {PreJobShampooReportComponent} from './pre-job/pre-job-shampoo-report/pre-job-shampoo-report.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PreJobSignatureComponent} from './pre-job/pre-job-signature/pre-job-signature.component';
import {QuoteApplianceCoverComponent} from './quote/quote-appliance-cover/quote-appliance-cover.component';
import {QuoteProductsComponent} from './quote/quote-products/quote-products.component';
import {QuoteOtherPlansComponent} from './quote/quote-other-plans/quote-other-plans.component';
import {QuoteCompleteComponent} from './quote/quote-complete/quote-complete.component';
import {QuoteComponent} from './quote/quote/quote.component';
import {QuoteSideNavComponent} from './quote/quote-side-nav/quote-side-nav.component';
import {JobCustomerContactComponent} from './job-customer-contact/job-customer-contact.component';
import {BillingComponentsModule} from "../../../../../../libs/billing/src/lib/billing-components/billing-components.module";
import { JobInvoiceComponent } from './job-invoice/job-invoice.component';
import { SignOffComponent } from './sign-off/sign-off/sign-off.component';
import {DocumentComponentsModule} from "../../../../../../libs/document/src/lib/document-components/document-components.module";
import { PostJobAfterPhotosComponent } from './sign-off/post-job-after-photos/post-job-after-photos.component';
import {BarRatingModule} from "ngx-bar-rating";

@NgModule({
  declarations: [
    JobInfoComponent,
    JobSideNavComponent,
    JobBaseComponent,
    JobPreJobComponent,
    JobFooterComponent,
    PreJobSideNavComponent,
    PreJobWorkSummaryComponent,
    PreJobAppliancesComponent,
    PreJobBeforePhotosComponent,
    PreJobVacuumReportComponent,
    PreJobShampooReportComponent,
    PreJobSignatureComponent,
    QuoteApplianceCoverComponent,
    QuoteProductsComponent,
    QuoteOtherPlansComponent,
    QuoteCompleteComponent,
    QuoteComponent,
    QuoteSideNavComponent,
    JobCustomerContactComponent,
    JobInvoiceComponent,
    SignOffComponent,
    PostJobAfterPhotosComponent
  ],
    imports: [
        CommonModule,
        IonicModule,
        AppointmentComponentsModule,
        CustomerComponentsModule,
        BillingComponentsModule,
        IonicCommonComponentsModule,
        RouterModule,
        ReactiveFormsModule,
        SignaturePadModule,
        DocumentComponentsModule,
        BarRatingModule
    ],
  exports: [
    JobSideNavComponent,
    JobFooterComponent
  ]
})
export class JobComponentsModule {
}
