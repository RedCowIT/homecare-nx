import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, of, throwError} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";
import {findByKey, QuoteSection, SubscribedContainer} from "@homecare/shared";
import {QuoteItemsService, QuotesService} from "@homecare/billing";
import {catchError, first, mergeMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'hc-quote-complete',
  templateUrl: './quote-complete.component.html',
  styleUrls: ['./quote-complete.component.scss']
})
export class QuoteCompleteComponent extends SubscribedContainer implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  constructor(public currentJobService: CurrentJobService,
              public quotesService: QuotesService,
              public quoteItemsService: QuoteItemsService) {
    super()
  }

  ngOnInit(): void {

    combineLatest([this.currentJobService.quote$, this.quoteItemsService.entities$]).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(([quote, quoteItems]) => {

      this.quoteItemsService.entitiesByQuoteId(quote.id).pipe(
        first()
      ).subscribe(quoteItems => {

        const acceptLabel = quoteItems.length ? 'Accept' : 'Next';

        this.footerButtons$.next([
          createFooterBackButton(async () => {

            this.currentJobService.navToPrevQuoteSection(QuoteSection.CompleteQuote);

          }),
          createFooterNextButton(async () => {

            this.acceptQuote();

          }, acceptLabel)
        ]);

      });





    });


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
