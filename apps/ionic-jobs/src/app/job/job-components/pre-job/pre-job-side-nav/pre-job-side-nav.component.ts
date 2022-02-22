import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ChecklistMenuItem} from "@homecare/common";
import {ActivatedRoute, Router} from "@angular/router";
import {JobService} from "../../../services/job/job.service";
import {filter, map} from "rxjs/operators";
import {JobSectionMeta, PreJobSectionMeta} from "@homecare/shared";
import {CurrentJobService} from "../../../services/current-job/current-job.service";

@Component({
  selector: 'hc-pre-job-side-nav',
  templateUrl: './pre-job-side-nav.component.html',
  styleUrls: ['./pre-job-side-nav.component.scss']
})
export class PreJobSideNavComponent implements OnInit {

  appointmentId: number; // resolved

  items$: Observable<ChecklistMenuItem[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public jobsService: JobService,
              public currentJobService: CurrentJobService) {
  }

  ngOnInit(): void {

    this.appointmentId = this.currentJobService.appointmentId;

    // console.log('PrejobSideNav.init', this.appointmentId);

    this.items$ = this.jobsService.entityMap$.pipe(
      map(jobMap => jobMap[this.appointmentId]),
      filter(job => !!job),
      map(job => {

        if (!job.preJobSections?.length){
          return [];
        }

        return job.preJobSections.map(jobSection => {

          return {
            id: jobSection.id,
            label: PreJobSectionMeta[jobSection.id].label,
            route: this.createRoute(jobSection.id),
            status: jobSection.status
          };

        })
      })
    )
  }

  createRoute(jobSectionId: string) {
    return `/job/${this.appointmentId}/pre-job/${jobSectionId}`;
  }

}
