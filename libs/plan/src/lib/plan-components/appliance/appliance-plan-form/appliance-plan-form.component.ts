import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'hc-appliance-plan-form',
  templateUrl: './appliance-plan-form.component.html',
  styleUrls: ['./appliance-plan-form.component.scss']
})
export class AppliancePlanFormComponent {

  @Input()
  formGroup: FormGroup;

  @Input()
  formGroupNameKey: string;

  @Input()
  hideTypeSelect = false;
}
