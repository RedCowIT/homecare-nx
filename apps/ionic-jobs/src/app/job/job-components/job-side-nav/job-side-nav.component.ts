import {Component, OnInit} from '@angular/core';
import {JobService} from "../../services/job/job.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {JobSectionMeta} from "@homecare/shared";
import {filter, map} from "rxjs/operators";
import {ChecklistMenuItem} from "@homecare/common";
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {PlatformService} from "@homecare/core";

@Component({
  selector: 'hc-job-side-nav',
  templateUrl: './job-side-nav.component.html',
  styleUrls: ['./job-side-nav.component.scss']
})
export class JobSideNavComponent implements OnInit {

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
        return job.jobSections.map(jobSection => {

          return {
            id: jobSection.id,
            label: JobSectionMeta[jobSection.id].label,
            route: this.createRoute(jobSection.id),
            icon: JobSectionMeta[jobSection.id].icon,
            status: jobSection.status
          };

        })
      })
    )
  }

  createRoute(jobSectionId: string) {
    return `/job/${this.appointmentId}/${jobSectionId}`;
  }

}
