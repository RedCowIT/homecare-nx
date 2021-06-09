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
import {IonicCommonComponentsModule} from "@homecare/ionic-common";
import { PreJobAppliancesComponent } from './pre-job/pre-job-appliances/pre-job-appliances.component';


@NgModule({
  declarations: [
    JobInfoComponent,
    JobSideNavComponent,
    JobBaseComponent,
    JobPreJobComponent,
    JobFooterComponent,
    PreJobSideNavComponent,
    PreJobWorkSummaryComponent,
    PreJobAppliancesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AppointmentComponentsModule,
    CustomerComponentsModule,
    IonicCommonComponentsModule,
    RouterModule
  ],
  exports: [
    JobSideNavComponent,
    JobFooterComponent
  ]
})
export class JobComponentsModule { }
