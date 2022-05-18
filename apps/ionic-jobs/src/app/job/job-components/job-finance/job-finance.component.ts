import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {createFooterNextButton} from "../../support/footer-button-factory";
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {Router} from "@angular/router";
import {JobSection} from "@homecare/shared";

@Component({
  selector: 'hc-job-finance',
  templateUrl: './job-finance.component.html',
  styleUrls: ['./job-finance.component.scss']
})
export class JobFinanceComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  constructor(public currentJobService: CurrentJobService,
              public router: Router) { }

  ngOnInit(): void {

    this.footerButtons$.next([
      createFooterNextButton(async () => {

        this.next();

      })
    ])
  }

  next(){
    this.currentJobService.completeJobSection(JobSection.Finance);
  }
}
