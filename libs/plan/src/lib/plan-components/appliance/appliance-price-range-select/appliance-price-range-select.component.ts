import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'hc-appliance-price-range-select',
  templateUrl: './appliance-price-range-select.component.html',
  styleUrls: ['./appliance-price-range-select.component.scss']
})
export class AppliancePriceRangeSelectComponent{

  @Input()
  formGroup: FormGroup;

  @Input()
  formGroupNameValue: string;

}
