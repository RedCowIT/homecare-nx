import {Component, Input, OnInit} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {AppointmentNoAnswer} from "@homecare/shared";
import {AppointmentNoAnswerFormService} from "../../services/form/appointment-no-answer-form/appointment-no-answer-form.service";
import {AppointmentNoAnswersService} from "../../store/entity/services/appointment-no-answers/appointment-no-answers.service";
import {AppointmentNoAnswerReasonsService} from "../../store/entity/services/appointment-no-answer-reasons/appointment-no-answer-reasons.service";

@Component({
  selector: 'hc-appointment-no-answer-form',
  templateUrl: './appointment-no-answer-form.component.html',
  styleUrls: ['./appointment-no-answer-form.component.scss'],
  providers: [
    AppointmentNoAnswerFormService
  ]
})
export class AppointmentNoAnswerFormComponent extends EntityFormContainer<AppointmentNoAnswer> implements OnInit {

  @Input()
  appointmentId: number;

  constructor(public formService: AppointmentNoAnswerFormService,
              public appointmentNoAnswerReasonsService: AppointmentNoAnswerReasonsService,
              public entityService: AppointmentNoAnswersService) {
    super(formService, entityService);
  }


  ngOnInit() {
    super.ngOnInit();
    this.patchForm({appointmentId: this.appointmentId});
    console.log('patched form', this.formService.form);
  }
}