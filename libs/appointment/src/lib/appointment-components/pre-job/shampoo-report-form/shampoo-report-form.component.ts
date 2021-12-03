import {Component, Input, OnInit} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {AppointmentVisit} from "@homecare/shared";
import {AppointmentVisitsService} from "../../../store/entity/services/appointment-visits/appointment-visits.service";
import {ShampooReportFormService} from "../../../services/form/shampoo-report-form/shampoo-report-form.service";

@Component({
  selector: 'hc-shampoo-report-form',
  templateUrl: './shampoo-report-form.component.html',
  styleUrls: ['./shampoo-report-form.component.scss'],
  providers: [ShampooReportFormService]
})
export class ShampooReportFormComponent extends EntityFormContainer<AppointmentVisit> implements OnInit {

  @Input()
  appointmentId: number;

  constructor(public formService: ShampooReportFormService,
              public entityService: AppointmentVisitsService) {
    super(formService, entityService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.patchForm({appointmentId: this.appointmentId});
  }
}
