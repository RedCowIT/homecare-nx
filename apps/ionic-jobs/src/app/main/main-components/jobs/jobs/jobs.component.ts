import {Component, OnInit} from '@angular/core';
import {PlatformService} from "@homecare/core";
import {AppointmentsService} from "@homecare/appointment";
import {JobsLoaderService} from "../../../../job/services/jobs-loader/jobs-loader.service";
import {first, map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Appointment} from "@homecare/shared";
import {CurrentJobService} from "../../../../job/services/current-job/current-job.service";
import * as moment from "moment";

@Component({
  selector: 'hc-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  appointments$: Observable<Appointment[]>;

  todaysAppointments$: Observable<Appointment[]>;

  tomorrowsAppointments$: Observable<Appointment[]>;

  day: 'today' | 'tomorrow' = 'today';

  constructor(public platform: PlatformService,
              public appointmentsService: AppointmentsService,
              public jobLoaderService: JobsLoaderService,
              public currentJobService: CurrentJobService) {
  }

  ngOnInit(): void {
    this.appointments$ = this.appointmentsService.entities$;
    this.todaysAppointments$ = this.appointments$.pipe(map(appointments => {
      return appointments.filter(appointment => {
        const date = moment(appointment.bookingDateTime);
        return date.isSame(moment(), 'day');
      });
    }));

    this.tomorrowsAppointments$ = this.appointments$.pipe(map(appointments => {
      return appointments.filter(appointment => {
        const date = moment(appointment.bookingDateTime);
        const tomorrow = moment().add(1, 'day');
        return date.isSame(tomorrow, 'day');
      });
    }));
  }

  refresh() {
    this.jobLoaderService.loading$.pipe(first()).subscribe(
      isLoading => {
        if (!isLoading) {
          this.jobLoaderService.loadAll();
        }
      }
    )
  }

}
