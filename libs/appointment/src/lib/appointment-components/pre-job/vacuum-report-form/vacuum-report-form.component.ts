import {Component, Input, OnInit} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {AppointmentVisit} from "@homecare/shared";
import {AppointmentVisitsService} from "../../../store/entity/services/appointment-visits/appointment-visits.service";
import {VacuumReportFormService} from "../../../services/form/vacuum-report-form/vacuum-report-form.service";

@Component({
  selector: 'hc-vacuum-report-form',
  templateUrl: './vacuum-report-form.component.html',
  styleUrls: ['./vacuum-report-form.component.scss'],
  providers: [VacuumReportFormService]
})
export class VacuumReportFormComponent extends EntityFormContainer<AppointmentVisit> implements OnInit {

  @Input()
  appointmentId: number;

  washFilterOptions = [
    { id: 'never', description: 'Never' }
  ];

  constructor(public formService: VacuumReportFormService,
              public entityService: AppointmentVisitsService) {
    super(formService, entityService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.patchForm({appointmentId: this.appointmentId});
    console.log('patched form', this.formService.form);
  }
}
