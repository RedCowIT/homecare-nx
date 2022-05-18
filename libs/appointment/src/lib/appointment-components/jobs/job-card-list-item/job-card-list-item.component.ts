import {Component, Input, OnInit} from '@angular/core';
import {AppointmentsService} from "../../../store/entity/services/appointments/appointments.service";
import {Appointment, selectEntity} from "@homecare/shared";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'hc-job-card-list-item',
  templateUrl: './job-card-list-item.component.html',
  styleUrls: ['./job-card-list-item.component.scss']
})
export class JobCardListItemComponent implements OnInit {

  @Input()
  appointmentId: number;

  @Input()
  isLoading: boolean;

  appointment$: Observable<Appointment>;

  showDetails = false;

  constructor(private appointmentsService: AppointmentsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.appointment$ = selectEntity(this.appointmentsService, this.appointmentId);
  }

  toggleDetails(){
    this.showDetails = !this.showDetails;
  }

  async openJob(){
    await this.router.navigateByUrl(`/job/${this.appointmentId}`);
  }
}
