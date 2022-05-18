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

  showError = false;

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

    // console.log('updateSignature', data);

    this.entityService.updateOneInCache({
      id: this.currentJobService.appointmentId,
      signatureJSON: data
    });

    // if (data) {
    //   this.showError = false;
    // }
  }

  completeAppointment() {

    this.showError = false;

    this.currentJobService.appointmentVisit$
      .pipe(first())
      .subscribe(appointmentVisit => {

        console.log('Signature', appointmentVisit.signatureJSON);

        if (!appointmentVisit.signatureJSON) {
          this.showError = true;
          return;
        }

        this.entityService.update(appointmentVisit).pipe(first()).subscribe(async () => {
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
