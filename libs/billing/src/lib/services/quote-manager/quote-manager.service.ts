import {findByKey, firstByKey, pluckIds, QuoteApplianceDetail, QuoteItem} from "@homecare/shared";
import {combineLatest, EMPTY, Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {QuoteApplianceDetailsService, QuoteItemsService, QuotesService} from "@homecare/billing";
import {map, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuoteManagerService {

  constructor(private quotesService: QuotesService,
              private quoteItemsService: QuoteItemsService,
              private quoteApplianceDetailsService: QuoteApplianceDetailsService) {
  }

  getAppointmentQuoteItems(appointmentId: number): Observable<QuoteItem[]> {
    return this.quotesService.getAppointmentQuote(appointmentId).pipe(
      mergeMap(quote => {
        if (!quote) {
          return of([]);
        }
        return this.quoteItemsService.entitiesByQuoteId(quote.id);
      })
    )
  }

  getQuoteApplianceDetails(appointmentId: number): Observable<QuoteApplianceDetail[]> {
    return combineLatest([
      this.getAppointmentQuoteItems(appointmentId),
      this.quoteApplianceDetailsService.entities$
    ]).pipe(
      map(([quoteItems, quoteApplianceDetails]) => {
        const quoteItemIds = pluckIds(quoteItems);
        // return details with quote item contained in array
        return quoteApplianceDetails.filter(quoteApplianceDetail => {
          return quoteItemIds.includes(quoteApplianceDetail.quoteItemId);
        })
      })
    );
  }

  getQuoteApplianceDetailsWithType(appointmentId: number, applianceTypeId: number): Observable<QuoteApplianceDetail[]> {
    return this.getQuoteApplianceDetails(appointmentId).pipe(
      map(quoteApplianceDetails => {
        return findByKey(quoteApplianceDetails, 'applianceTypeId', applianceTypeId);
      })
    )
  }

}
