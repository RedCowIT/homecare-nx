import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, of, throwError} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";
import {QuoteSection} from "@homecare/shared";
import {QuotesService} from "@homecare/billing";
import {catchError, first, mergeMap} from "rxjs/operators";

@Component({
  selector: 'hc-quote-complete',
  templateUrl: './quote-complete.component.html',
  styleUrls: ['./quote-complete.component.scss']
})
export class QuoteCompleteComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  constructor(public currentJobService: CurrentJobService,
              public quotesService: QuotesService) {
  }

  ngOnInit(): void {
    this.footerButtons$.next([
      createFooterBackButton(async () => {

        this.currentJobService.navToPrevQuoteSection(QuoteSection.CompleteQuote);

      }),
      {
        slot: 'start',
        label: 'Defer',
        color: 'dark',
        callback: () => {
          this.deferQuote();
        }
      },
      createFooterNextButton(async () => {

        this.acceptQuote();

      }, 'Accept')
    ])
  }

  deferQuote() {
    this.currentJobService.completeQuoteSection(QuoteSection.CompleteQuote);
  }

  acceptQuote() {

    this.currentJobService.quote$.pipe(
      mergeMap(quote => {

        if (quote.accepted){
          return of(quote);
        } else {
          return this.quotesService.update({
            ...quote,
            accepted: true
          }).pipe(
            catchError(error => {
              return throwError(error);
            })
          )
        }

      }),
      first()
    ).subscribe(quote => {
      this.currentJobService.completeQuoteSection(QuoteSection.CompleteQuote);
    });
  }
}
