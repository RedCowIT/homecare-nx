import {Component, OnInit} from '@angular/core';
import {ButtonConfig} from "@homecare/common";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {PlatformService} from "@homecare/core";

@Component({
  selector: 'hc-job-pre-job',
  templateUrl: './job-pre-job.component.html',
  styleUrls: ['./job-pre-job.component.scss']
})
export class JobPreJobComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  constructor(public router: Router,
              public platform: PlatformService) {

  }

  ngOnInit(): void {
  }


}
