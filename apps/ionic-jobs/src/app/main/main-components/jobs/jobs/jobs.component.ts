import { Component, OnInit } from '@angular/core';
import {PlatformService} from "@homecare/core";
import {AppointmentsService} from "@homecare/appointment";

@Component({
  selector: 'hc-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(public platform: PlatformService, public appointmentsService: AppointmentsService) { }

  ngOnInit(): void {
  }

}
