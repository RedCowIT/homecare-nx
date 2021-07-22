import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";
import {QuoteSection} from "@homecare/shared";
import {CurrentJobService} from "../../../services/current-job/current-job.service";

@Component({
  selector: 'hc-quote-products',
  templateUrl: './quote-products.component.html',
  styleUrls: ['./quote-products.component.scss']
})
export class QuoteProductsComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  constructor(public currentJobService: CurrentJobService) { }

  ngOnInit(): void {
    this.footerButtons$.next([
      createFooterBackButton(async () => {

        this.currentJobService.navToPrevQuoteSection(QuoteSection.Products);

      }),
      createFooterNextButton(async () => {

        this.currentJobService.completeQuoteSection(QuoteSection.Products);

      })
    ])
  }

}
