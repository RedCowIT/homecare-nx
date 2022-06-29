import {Component, OnInit, ViewChild} from '@angular/core';

import {EntityFormContainer} from "@homecare/entity";
import {AppointmentVisit, JobSection, PreJobSection, selectEntity, selectFirstEntityByKey} from "@homecare/shared";
import {AppointmentVisitCompleteFormService, AppointmentVisitsService} from "@homecare/appointment";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {first} from "rxjs/operators";
import {SignaturePadComponent} from "../../../../../../../../libs/ionic-common/src/lib/signature-pad/signature-pad.component";

@Component({
  selector: 'hc-sign-off',
  templateUrl: './sign-off.component.html',
  styleUrls: ['./sign-off.component.scss'],
  providers: [AppointmentVisitCompleteFormService]
})
export class SignOffComponent extends EntityFormContainer<AppointmentVisit> implements OnInit {

  errors = [];

  sigError = false;

  @ViewChild(SignaturePadComponent)
  signaturePadComponent: SignaturePadComponent;

  constructor(public currentJobService: CurrentJobService,
              public formService: AppointmentVisitCompleteFormService,
              public entityService: AppointmentVisitsService) {
    super(formService, entityService);
  }

  ngOnInit(): void {

    // AppointmentVisit.id === Appointment.id
    selectEntity(this.entityService, this.currentJobService.appointmentId)
      .pipe(first()).subscribe(
      appointmentVisit => {
        this.id = appointmentVisit.id;
        super.ngOnInit();
      }
    );

  }

  updateSignature(data) {

    this.entityService.updateOneInCache({
      id: this.currentJobService.appointmentId,
      signatureJSON: data
    });

    // if (data) {
    //   this.showError = false;
    // }
  }

  completeAppointment() {

    this.sigError = false;

    this.formService.form.markAllAsTouched();

    this.currentJobService.appointmentVisit$
      .pipe(first())
      .subscribe(appointmentVisit => {

        if (!appointmentVisit.signatureJSON) {
          this.sigError = true;
          return;
        }

        if (!this.formService.form.valid){
          this.formService.form.markAllAsTouched();
          return;
        }

        const form = this.formService.createDTO() as AppointmentVisit;
        const visit = {...appointmentVisit};
        visit.signatureName = form.signatureName;
        visit.engineerRating = form.engineerRating;
        visit.customerComments = form.customerComments;

        this.entityService.update(visit).pipe(first()).subscribe(async () => {
          await this.currentJobService.completeJobSection(JobSection.SignOff);
        });

      });

  }

  ngAfterViewInit(){
    this.currentJobService.appointmentVisit$.pipe(first()).subscribe(
      appointmentVisit => {
        if (appointmentVisit.signatureJSON){
          this.signaturePadComponent.fromDataURL(appointmentVisit.signatureJSON);
        }
      }
    )
  }
}
