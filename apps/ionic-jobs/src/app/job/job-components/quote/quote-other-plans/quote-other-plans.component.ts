import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";
import {QuoteSection} from "@homecare/shared";

@Component({
  selector: 'hc-quote-other-plans',
  templateUrl: './quote-other-plans.component.html',
  styleUrls: ['./quote-other-plans.component.scss']
})
export class QuoteOtherPlansComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  constructor(public currentJobService: CurrentJobService) { }

  ngOnInit(): void {
    this.footerButtons$.next([
      createFooterBackButton(async () => {

        this.currentJobService.navToPrevQuoteSection(QuoteSection.OtherPlans);

      }),
      createFooterNextButton(async () => {

        this.currentJobService.completeQuoteSection(QuoteSection.OtherPlans);

      })
    ])
  }

}
