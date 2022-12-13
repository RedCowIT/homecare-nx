import {Injectable, TemplateRef} from '@angular/core';
import {TableSourceService} from "@homecare/common";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {QuoteApplianceDetailsService} from "../../../store/entity/services/quote/quote-appliance-details/quote-appliance-details.service";
import {QuoteItemsService} from "../../../store/entity/services/quote/quote-items/quote-items.service";
import {QuoteItemTypesService} from "../../../store/entity/services/quote/quote-item-types/quote-item-types.service";
import {QuotePlanDetailsService} from "../../../store/entity/services/quote/quote-plan-details/quote-plan-details.service";
import {QuoteProductDetailsService} from '../../../store/entity/services/quote/quote-product-details/quote-product-details.service';
import {
  ApplianceType,
  firstByKey, Plan,
  Product,
  QuoteApplianceDetail,
  QuoteItemTypes, QuotePlanDetail,
  QuoteProductDetail
} from "@homecare/shared";
import {Dictionary} from "@ngrx/entity";
import {ApplianceTypesService, ProductsService} from "@homecare/product";

import {PlansService} from "@homecare/plan";

@Injectable()
export class QuoteTableService extends TableSourceService {

  quoteId: number;

  hasInitialized: boolean;

  constructor(private quoteItemsService: QuoteItemsService,
              private quoteItemTypesService: QuoteItemTypesService,
              private productsService: ProductsService,
              private plansService: PlansService,
              private quoteApplianceDetailsService: QuoteApplianceDetailsService,
              private quoteProductDetailsService: QuoteProductDetailsService,
              private quotePlanDetailsService: QuotePlanDetailsService,
              private applianceTypesService: ApplianceTypesService) {
    super();
  }

  init(quoteId: number, cellTemplates: { [index: string]: TemplateRef<unknown> }) {

    this.quoteId = quoteId;

    this.columns = [
      {prop: 'description', flexGrow: 3},
      {prop: 'quantity', flexGrow: 1.5},
      {
        prop: 'quote', name: 'Cost', flexGrow: 1.5, headerClass: "ion-text-end", cellClass: 'ion-text-end',
        cellTemplate: cellTemplates['value']
      }
    ];

    const maps$ = combineLatest([
      this.quoteItemTypesService.entityMap$,
      this.applianceTypesService.entityMap$,
      this.productsService.entityMap$,
      this.plansService.entityMap$
    ]).pipe(map(([
                   quoteItemTypes,
                   applianceTypes,
                   products,
                   plans
                 ]) => {

      return {
        quoteItemTypes,
        applianceTypes,
        products,
        plans
      };

    }));

    this.rows$ = combineLatest([
      maps$,
      this.quoteItemsService.entitiesByQuoteId(this.quoteId),
      this.quoteItemTypesService.entityMap$,
      this.quoteApplianceDetailsService.entities$,
      this.quoteProductDetailsService.entities$,
      this.quotePlanDetailsService.entities$
    ]).pipe(
      map(([
             maps,
             quoteItems,
             quoteItemTypeMap,
             quoteApplianceDetails,
             quoteProductDetails,
             quotePlanDetails
           ]) => {

        return quoteItems.map(quoteItem => {

          let description = '';

          switch (quoteItemTypeMap[quoteItem.quoteItemTypeId].description) {
            case QuoteItemTypes.Appliance:
              description = this.getApplianceCoverDescription(quoteItem.id, quoteApplianceDetails, maps.applianceTypes);
              break;
            case QuoteItemTypes.Product:
              description = this.getProductDescription(quoteItem.id, quoteProductDetails, maps.products)
              break;
            case QuoteItemTypes.Plan:
              description = this.getPlanDescription(quoteItem.id, quotePlanDetails, maps.plans)
              break;
          }

          return {
            id: quoteItem.id,
            description,
            quote: quoteItem.quote,
            quantity: 1
          };

        });
      })
    );

    this.hasInitialized = true;
  }

  load() {
    this.quoteItemsService.getWithQuery({
      quoteId: `${this.quoteId}`
    }, {tag: 'QuoteTable'});
  }

  getApplianceCoverDescription(quoteItemId: number,
                               quoteApplianceDetails: QuoteApplianceDetail[],
                               applianceTypeMap: Dictionary<ApplianceType>): string {

    const details = firstByKey<QuoteApplianceDetail>(quoteApplianceDetails, 'quoteItemId', quoteItemId);
    if (!details) {
      return null;
    }

    return `${applianceTypeMap[details.applianceTypeId].description} Cover Plan`;
  }

  getProductDescription(quoteItemId: number,
                        quoteProductDetails: QuoteProductDetail[],
                        productMap: Dictionary<Product>): string {
    const details = firstByKey<QuoteProductDetail>(quoteProductDetails, 'quoteItemId', quoteItemId);
    if (!details) {
      return null;
    }

    return `${productMap[details.productId].description}`;
  }

  getPlanDescription(quoteItemId: number,
                     quotePlanDetails: QuotePlanDetail[],
                     planMap: Dictionary<Plan>): string {
    const details = firstByKey<QuotePlanDetail>(quotePlanDetails, 'quoteItemId', quoteItemId);
    if (!details) {
      return null;
    }

    return `${planMap[details.planId].description}`;
  }
}

