import {Component, OnInit} from '@angular/core';

import {EntityFormContainer} from "@homecare/entity";
import {AppointmentVisit, selectEntity, selectFirstEntityByKey} from "@homecare/shared";
import {AppointmentVisitCompleteFormService, AppointmentVisitsService} from "@homecare/appointment";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'hc-sign-off',
  templateUrl: './sign-off.component.html',
  styleUrls: ['./sign-off.component.scss'],
  providers: [AppointmentVisitCompleteFormService]
})
export class SignOffComponent extends EntityFormContainer<AppointmentVisit> implements OnInit {

  errors = [];

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

  updateSignature(data){

  }

}
