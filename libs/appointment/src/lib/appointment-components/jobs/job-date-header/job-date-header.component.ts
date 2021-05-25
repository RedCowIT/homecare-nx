import {Component, Input} from '@angular/core';

@Component({
  selector: 'hc-job-date-header',
  templateUrl: './job-date-header.component.html',
  styleUrls: ['./job-date-header.component.scss']
})
export class JobDateHeaderComponent{

  @Input()
  date: string;

}
