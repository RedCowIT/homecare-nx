import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JobBaseComponent} from "../job-base/job-base.component";
import {JobService} from "../../services/job/job.service";
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";

@Component({
  selector: 'hc-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  constructor(public route: ActivatedRoute,
              public router: Router,
              public currentJobService: CurrentJobService) {

  }

  ngOnInit(): void {
    this.footerButtons$.next([
      {
        slot: 'end',
        label: 'Next',
        callback: async () => {
          await this.router.navigateByUrl(`/job/${this.currentJobService.appointmentId}/pre-job`);
        }
      }
    ])
  }

}
