import {Component, OnInit} from '@angular/core';
import {PlatformService} from "@homecare/core";
import {ActivatedRoute} from "@angular/router";
import {first, tap} from "rxjs/operators";
import {SubscribedContainer} from "@homecare/shared";
import {JobService} from "../../services/job/job.service";

@Component({
  selector: 'hc-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage extends SubscribedContainer implements OnInit {

  constructor(public platform: PlatformService,
              public jobService: JobService,
              public route: ActivatedRoute) {
    super();
  }

  ngOnInit() {

    console.log('JobPage', this.route.snapshot.data['appointmentId']);

    this.route.paramMap.pipe(
      tap(paramMap => {
        console.log('JobPage.addJob');
        this.jobService.addJob(parseInt(paramMap.get('id')));
        // this.jobService.setAppointmentId(parseInt(paramMap.get('id')))
      }),
      first()
    ).subscribe()
  }

}
