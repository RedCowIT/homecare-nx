import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JobBaseComponent} from "../job-base/job-base.component";
import {JobService} from "../../services/job/job.service";
import {CurrentJobService} from "../../services/current-job/current-job.service";

@Component({
  selector: 'hc-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent {

  constructor(public route: ActivatedRoute,
              public currentJobService: CurrentJobService) {

  }


}
