import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentJobService} from "../../../services/current-job/current-job.service";

@Component({
  selector: 'hc-pre-job-work-summary',
  templateUrl: './pre-job-work-summary.component.html',
  styleUrls: ['./pre-job-work-summary.component.scss']
})
export class PreJobWorkSummaryComponent implements OnInit {

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
          await this.router.navigateByUrl(`/job/${this.currentJobService.appointmentId}/pre-job/appliances`);
        }
      }
    ])
  }
}
