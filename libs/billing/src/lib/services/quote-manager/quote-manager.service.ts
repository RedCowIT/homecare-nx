import {
  findByKey, firstItem,
  pluckIds,
  QuoteApplianceDetail,
  QuoteItem,
  QuotePlanDetail,
  QuoteProductDetail
} from "@homecare/shared";
import {combineLatest, Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {QuoteApplianceDetailsService} from '../../store/entity/services/quote/quote-appliance-details/quote-appliance-details.service';;
import {QuotePlanDetailsService} from '../../store/entity/services/quote/quote-plan-details/quote-plan-details.service';
import {QuoteProductDetailsService} from '../../store/entity/services/quote/quote-product-details/quote-product-details.service';
import {QuotesService} from "../../store/entity/services/quote/quotes/quotes.service";
import {QuoteItemsService} from '../../store/entity/services/quote/quote-items/quote-items.service';
import {first, map, mergeMap} from "rxjs/operators";
import {QuoteApplianceDetailModalComponent} from "../../billing-components/quote/quote-appliance-detail-modal/quote-appliance-detail-modal.component";

@Injectable({
  providedIn: 'root'
})
export class QuoteManagerService {

  constructor(private quotesService: QuotesService,
              private quoteItemsService: QuoteItemsService,
              private quoteApplianceDetailsService: QuoteApplianceDetailsService,
              private quoteProductDetailsService: QuoteProductDetailsService,
              private quotePlanDetailsService: QuotePlanDetailsService) {
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

  getQuotePlanDetailsWithType(appointmentId: number, planTypeId: number): Observable<QuotePlanDetail[]> {
    return this.getQuotePlanDetails(appointmentId).pipe(
      map(quotePlanDetails => {
        return findByKey(quotePlanDetails, 'planTypeId', planTypeId);
      })
    )
  }

  getQuotePlanDetails(appointmentId: number): Observable<QuotePlanDetail[]> {
    return combineLatest([
      this.getAppointmentQuoteItems(appointmentId),
      this.quotePlanDetailsService.entities$
    ]).pipe(
      map(([quoteItems, quotePlanDetails]) => {
        const quoteItemIds = pluckIds(quoteItems);
        return quotePlanDetails.filter(quotePlanDetail => {
          return quoteItemIds.includes(quotePlanDetail.quoteItemId);
        })
      })
    );
  }

  getQuotePlanDetailsWithId(appointmentId: number, planId: number): Observable<QuotePlanDetail[]> {
    return this.getQuotePlanDetails(appointmentId).pipe(
      map(quotePlanDetails => {
        return findByKey(quotePlanDetails, 'planId', planId);
      })
    );
  }

  getQuoteProductDetails(appointmentId: number): Observable<QuoteProductDetail[]> {
    return combineLatest([
      this.getAppointmentQuoteItems(appointmentId),
      this.quoteProductDetailsService.entities$
    ]).pipe(
      map(([quoteItems, quoteProductDetails]) => {
        const quoteItemIds = pluckIds(quoteItems);
        return quoteProductDetails.filter(quoteProductDetail => {
          return quoteItemIds.includes(quoteProductDetail.quoteItemId);
        })
      })
    );
  }

  getQuoteProductDetailsWithId(appointmentId: number, productId: number): Observable<QuoteProductDetail[]> {
    return this.getQuoteProductDetails(appointmentId).pipe(
      map(quoteProductDetails => {
        return findByKey(quoteProductDetails, 'productId', productId);
      })
    );
  }

}
