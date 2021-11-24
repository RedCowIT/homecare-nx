import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'hc-plan-payment-period-select',
  templateUrl: './plan-payment-period-select.component.html',
  styleUrls: ['./plan-payment-period-select.component.scss']
})
export class PlanPaymentPeriodSelectComponent {

  @Input()
  formGroup: FormGroup;

  @Input()
  formGroupNameValue: string;

  constructor() {
  }

}
