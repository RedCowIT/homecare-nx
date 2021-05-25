import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobInfoComponent } from './job-info/job-info.component';
import {IonicModule} from "@ionic/angular";
import {AppointmentComponentsModule} from "@homecare/appointment";
import {CustomerComponentsModule} from "@homecare/customer";
import { JobSideNavComponent } from './job-side-nav/job-side-nav.component';
import {RouterModule} from "@angular/router";
import { JobBaseComponent } from './job-base/job-base.component';



@NgModule({
  declarations: [
    JobInfoComponent,
    JobSideNavComponent,
    JobBaseComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AppointmentComponentsModule,
    CustomerComponentsModule,
    RouterModule
  ],
  exports: [
    JobSideNavComponent
  ]
})
export class JobComponentsModule { }
