import {Component, Input} from '@angular/core';

@Component({
  selector: 'dd-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  @Input()
  show: boolean;

  @Input()
  color = 'primary';
}
