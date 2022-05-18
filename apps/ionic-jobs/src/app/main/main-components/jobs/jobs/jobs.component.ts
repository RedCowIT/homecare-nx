import { Component, OnInit } from '@angular/core';
import {PlatformService} from "@homecare/core";
import {AppointmentsService} from "@homecare/appointment";
import {JobsLoaderService} from "../../../../job/services/jobs-loader/jobs-loader.service";
import {first} from "rxjs/operators";
import {Observable} from "rxjs";
import {Appointment} from "@homecare/shared";
import {CurrentJobService} from "../../../../job/services/current-job/current-job.service";

@Component({
  selector: 'hc-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  appointments$: Observable<Appointment[]>;

  constructor(public platform: PlatformService,
              public appointmentsService: AppointmentsService,
              public jobLoaderService: JobsLoaderService,
              public currentJobService: CurrentJobService) { }

  ngOnInit(): void {
    this.appointments$ = this.appointmentsService.entities$;
  }

  refresh(){
    this.jobLoaderService.loading$.pipe(first()).subscribe(
      isLoading => {
        if (!isLoading) {
          this.jobLoaderService.loadAll();
        }
      }
    )
  }

}
