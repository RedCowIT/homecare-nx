import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JobBaseComponent} from "../job-base/job-base.component";
import {JobService} from "../../services/job/job.service";
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {first} from "rxjs/operators";

@Component({
  selector: 'hc-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  constructor(public route: ActivatedRoute,
              public router: Router,
              public currentJobService: CurrentJobService,
              public jobService: JobService) {

  }

  ngOnInit(): void {
    this.footerButtons$.next([
      {
        slot: 'end',
        label: 'Next',
        callback: async () => {

          // if call types are NCO only, skip to quotes, otherwise pre job.

          this.jobService.isNCOOnly(this.currentJobService.appointmentId).pipe(first()).subscribe(
            async isNCOOnly => {
              let url = '';
              if (isNCOOnly) {
                url = `/job/${this.currentJobService.appointmentId}/quote`;
              } else {
                url = `/job/${this.currentJobService.appointmentId}/pre-job`;
              }

              await this.router.navigateByUrl(url);
            }
          )

        }
      }
    ])
  }

}
