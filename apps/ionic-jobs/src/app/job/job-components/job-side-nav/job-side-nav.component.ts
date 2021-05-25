import {Component, OnInit} from '@angular/core';
import {JobService} from "../../services/job/job.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {JobSectionMeta} from "@homecare/shared";
import {filter, map} from "rxjs/operators";
import {ChecklistMenuItem} from "@homecare/common";

@Component({
  selector: 'hc-job-side-nav',
  templateUrl: './job-side-nav.component.html',
  styleUrls: ['./job-side-nav.component.scss']
})
export class JobSideNavComponent implements OnInit {

  appointmentId: number; // resolved

  items$: Observable<ChecklistMenuItem[]>;

  constructor(private route: ActivatedRoute, public jobsService: JobService) {
  }

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.data['appointmentId'];

    this.items$ = this.jobsService.entityMap$.pipe(
      map(jobMap => jobMap[this.appointmentId]),
      filter(job => !!job),
      map(job => {
        return job.jobSections.map(jobSection => {

          return {
            id: jobSection.id,
            label: JobSectionMeta[jobSection.id].label,
            route: jobSection.id,
            icon: JobSectionMeta[jobSection.id].icon,
            status: jobSection.status
          };

        })
      })
    )
  }

  navigate(route: string) {

  }
}
