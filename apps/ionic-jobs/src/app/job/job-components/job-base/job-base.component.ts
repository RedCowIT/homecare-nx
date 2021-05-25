import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Appointment} from "@homecare/shared";
import {JobService} from "../../services/job/job.service";
import {assertNonNull} from "@homecare/common";

/**
 * Not used
 */
@Component({
  selector: 'hc-job-base',
  templateUrl: './job-base.component.html',
  styleUrls: ['./job-base.component.scss']
})
export class JobBaseComponent implements OnInit {

  appointmentId: number;

  appointment$: Observable<Appointment>;

  constructor(public route: ActivatedRoute,
              public jobsService: JobService) {

  }

  ngOnInit(): void {
    console.log('JobBaseComponeent', this.route.snapshot);

  }

}
