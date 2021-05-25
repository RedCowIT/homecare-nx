import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from "@homecare/shared";

@Component({
  selector: 'hc-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  @Input()
  appointments: Appointment[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
