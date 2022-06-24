import {Injectable} from '@angular/core';
import {QuoteItemsService} from "../../../store/entity/services/quote/quote-items/quote-items.service";
import {QuotesService} from '../../../store/entity/services/quote/quotes/quotes.service';
import {Observable} from "rxjs";
import {QuoteSummary} from "@homecare/shared";
import {map} from "rxjs/operators";

@Injectable()
export class QuoteSummaryService {

  quoteId: number;

  hasInitialized: boolean;

  quoteSummary$ = new Observable<QuoteSummary>();

  constructor(public quotesService: QuotesService, public quoteItemsService: QuoteItemsService) {
  }

  init(quoteId: number) {
    this.quoteSummary$ = this.quoteItemsService.entitiesByQuoteId(quoteId).pipe(
      map(quoteItems => {

      if (!quoteItems || quoteItems.length === 0){
        return {
          quoteId,
          gross: 0
        }
      }

        const gross = quoteItems.map(quoteItem => quoteItem.quote * quoteItem.qty)
          .reduce((previousValue, currentValue) => previousValue + currentValue);

        return {
          quoteId,
          gross
        }
      })
    )
  }
}
