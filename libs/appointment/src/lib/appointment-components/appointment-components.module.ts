import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobListComponent} from "./jobs/job-list/job-list.component";
import {JobCardListComponent} from "./jobs/job-card-list/job-card-list.component";
import {JobCardListItemComponent} from "./jobs/job-card-list-item/job-card-list-item.component";
import {JobListItemComponent} from "./jobs/job-list-item/job-list-item.component";
import {IonicModule} from "@ionic/angular";
import {AppointmentTimeComponent} from './appointment-time/appointment-time.component';
import {AppointmentDateComponent} from './appointment-date/appointment-date.component';
import {JobDateHeaderComponent} from './jobs/job-date-header/job-date-header.component';
import {NoAnswerButtonComponent} from "./jobs/no-answer-button/no-answer-button.component";
import {CustomerComponentsModule} from "@homecare/customer";
import {AppointmentNoAnswerFormComponent} from './appointment-no-answer-form/appointment-no-answer-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AppointmentNoAnswerModalComponent} from './appointment-no-answer-modal/appointment-no-answer-modal.component';
import {SharedComponentsModule} from "@homecare/shared";
import {IonicCommonComponentsModule} from "@homecare/ionic-common";
import {RouterModule} from "@angular/router";
import {JobDetailsComponent} from "./jobs/job-details/job-details.component";
import {AppointmentBaseComponent} from "./appointment-base/appointment-base.component";
import {AppointmentCallTypeListComponent} from './appointment-call-type-list/appointment-call-type-list.component';
import { ShampooReportFormComponent } from './pre-job/shampoo-report-form/shampoo-report-form.component';
import { VacuumReportFormComponent } from './pre-job/vacuum-report-form/vacuum-report-form.component';
import { OvenReportFormComponent } from './pre-job/oven-report-form/oven-report-form.component';


@NgModule({
  declarations: [
    JobListComponent,
    JobListItemComponent,
    JobCardListComponent,
    JobCardListItemComponent,
    AppointmentTimeComponent,
    AppointmentDateComponent,
    JobDateHeaderComponent,
    NoAnswerButtonComponent,
    AppointmentNoAnswerFormComponent,
    AppointmentNoAnswerModalComponent,
    JobDetailsComponent,
    AppointmentBaseComponent,
    AppointmentCallTypeListComponent,
    ShampooReportFormComponent,
    VacuumReportFormComponent,
    OvenReportFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CustomerComponentsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    IonicCommonComponentsModule,
    RouterModule
  ],
  exports: [
    JobListComponent,
    JobListItemComponent,
    JobCardListComponent,
    JobCardListItemComponent,
    NoAnswerButtonComponent,
    JobDateHeaderComponent,
    JobDetailsComponent,
    AppointmentBaseComponent,
    AppointmentCallTypeListComponent,
    VacuumReportFormComponent,
    ShampooReportFormComponent,
    OvenReportFormComponent
  ]
})
export class AppointmentComponentsModule { }
