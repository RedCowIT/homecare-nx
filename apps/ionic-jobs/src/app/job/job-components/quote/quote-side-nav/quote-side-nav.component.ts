import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ChecklistMenuItem} from "@homecare/common";
import {ActivatedRoute, Router} from "@angular/router";
import {JobService} from "../../../services/job/job.service";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {filter, map} from "rxjs/operators";
import {PreJobSectionMeta, QuoteSectionMeta} from "@homecare/shared";
import {PlatformService} from "@homecare/core";

@Component({
  selector: 'hc-quote-side-nav',
  templateUrl: './quote-side-nav.component.html',
  styleUrls: ['./quote-side-nav.component.scss']
})
export class QuoteSideNavComponent implements OnInit {

  appointmentId: number; // resolved

  items$: Observable<ChecklistMenuItem[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public jobsService: JobService,
              public currentJobService: CurrentJobService,
              public platformService: PlatformService) {
  }

  ngOnInit(): void {

    this.appointmentId = this.currentJobService.appointmentId;

    this.items$ = this.jobsService.entityMap$.pipe(
      map(jobMap => jobMap[this.appointmentId]),
      filter(job => !!job),
      map(job => {

        return job.quoteSections.map(jobSection => {

          return {
            id: jobSection.id,
            label: QuoteSectionMeta[jobSection.id].label,
            icon: QuoteSectionMeta[jobSection.id].icon,
            route: this.createRoute(jobSection.id),
            status: jobSection.status
          };

        })
      })
    )
  }

  createRoute(jobSectionId: string) {
    return `/job/${this.appointmentId}/quote/${jobSectionId}`;
  }

}
