import {
  findByKey, firstByKey, firstItem,
  pluckIds,
  QuoteApplianceDetail,
  QuoteItem, QuoteItemTypes,
  QuotePlanDetail,
  QuoteProductDetail, selectOrFetchEntity
} from "@homecare/shared";
import {combineLatest, forkJoin, Observable, of, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {QuoteApplianceDetailsService} from '../../store/entity/services/quote/quote-appliance-details/quote-appliance-details.service';

import {QuotePlanDetailsService} from '../../store/entity/services/quote/quote-plan-details/quote-plan-details.service';
import {QuoteProductDetailsService} from '../../store/entity/services/quote/quote-product-details/quote-product-details.service';
import {QuotesService} from "../../store/entity/services/quote/quotes/quotes.service";
import {QuoteItemsService} from '../../store/entity/services/quote/quote-items/quote-items.service';
import {catchError, filter, first, map, mergeMap} from "rxjs/operators";
import {QuoteApplianceDetailModalComponent} from "../../billing-components/quote/quote-appliance-detail-modal/quote-appliance-detail-modal.component";
import {QuoteItemTypesService} from "../../store/entity/services/quote/quote-item-types/quote-item-types.service";
import {PlansService} from "@homecare/plan";

@Injectable({
  providedIn: 'root'
})
export class QuoteManagerService {

  constructor(private quotesService: QuotesService,
              private quoteItemsService: QuoteItemsService,
              private quoteApplianceDetailsService: QuoteApplianceDetailsService,
              private quoteProductDetailsService: QuoteProductDetailsService,
              private quotePlanDetailsService: QuotePlanDetailsService,
              private quoteItemTypesService: QuoteItemTypesService,
              private plansService: PlansService) {
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
    return combineLatest([this.getQuotePlanDetails(appointmentId), this.plansService.entityMap$]).pipe(
      map(([quotePlanDetails, plans]) => {

        return quotePlanDetails.filter(quotePlanDetail => {

          const plan = plans[quotePlanDetail.planId];
          return plan.planTypeId === planTypeId;

        });
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

  loadAppointmentQuote(appointmentId: number): Observable<boolean> {

    return this.quotesService.getWithQuery({
      appointmentId: `${appointmentId}`
    }).pipe(
      mergeMap(quotes => {
        const quote = firstItem(quotes);
        if (!quote) {
          return of(true);
        }
        return this.quoteItemsService.getWithQuery({
          quoteId: `${quote.id}`
        });
      }),
      mergeMap((quoteItems: QuoteItem[]) => {
        return combineLatest([of(quoteItems), this.quoteItemTypesService.entityMap$]).pipe(first());
      }),
      mergeMap(([quoteItems, quoteItemTypeMap]) => {

        if (!quoteItems?.length){
          return of(null);
        }

        const quoteItemDetails = [];
        for (const quoteItem of quoteItems) {

          const quoteItemType = quoteItemTypeMap[quoteItem.quoteItemTypeId];
          if (!quoteItemType) {
            throw new Error('Missing quote item type with id: ' + quoteItem.quoteItemTypeId);
          }

          switch (quoteItemType.description) {
            case QuoteItemTypes.Appliance:
              quoteItemDetails.push(this.quoteApplianceDetailsService.getWithQuery({
                quoteItemId: `${quoteItem.id}`
              }));
              break;
            case QuoteItemTypes.Product:
              quoteItemDetails.push(this.quoteProductDetailsService.getWithQuery({
                quoteItemId: `${quoteItem.id}`
              }));
              break;
            case QuoteItemTypes.Plan:
              quoteItemDetails.push(this.quotePlanDetailsService.getWithQuery({
                quoteItemId: `${quoteItem.id}`
              }));
              break;
          }
        }

        return forkJoin(quoteItemDetails);
      }),
      mergeMap(() => of(true)),
      catchError(error => {
        console.error('Quote load error', error);
        return throwError(error);
      })
    );


  }

}
