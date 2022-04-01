import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {createFooterNextButton} from "../../support/footer-button-factory";
import {CurrentJobService} from "../../services/current-job/current-job.service";

@Component({
  selector: 'hc-job-finance',
  templateUrl: './job-finance.component.html',
  styleUrls: ['./job-finance.component.scss']
})
export class JobFinanceComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  constructor(public currentJobService: CurrentJobService) { }

  ngOnInit(): void {

    this.footerButtons$.next([
      createFooterNextButton(async () => {

        // this.complete();

      })
    ])
  }

}
