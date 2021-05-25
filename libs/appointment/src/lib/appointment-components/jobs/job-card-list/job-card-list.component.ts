import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from "@homecare/shared";

@Component({
  selector: 'hc-job-card-list',
  templateUrl: './job-card-list.component.html',
  styleUrls: ['./job-card-list.component.scss']
})
export class JobCardListComponent implements OnInit {

  @Input()
  appointments: Appointment[]
  
  constructor() { }

  ngOnInit(): void {
  }

}
