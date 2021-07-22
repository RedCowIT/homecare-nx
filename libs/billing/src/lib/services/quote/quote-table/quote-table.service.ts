import {Injectable} from '@angular/core';
import {TableSourceService} from "@homecare/common";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {QuoteApplianceDetailsService} from "../../../store/entity/services/quote-appliance-details/quote-appliance-details.service";
import {QuoteItemsService} from "../../../store/entity/services/quote-items/quote-items.service";
import {QuoteItemTypesService} from "../../../store/entity/services/quote-item-types/quote-item-types.service";
import {ApplianceType, firstByKey, QuoteApplianceDetail, QuoteItemTypes} from "@homecare/shared";
import {Dictionary} from "@ngrx/entity";
import {ApplianceTypesService} from "@homecare/product";

@Injectable()
export class QuoteTableService extends TableSourceService {

  quoteId: number;

  hasInitialized: boolean;

  constructor(private quoteItemsService: QuoteItemsService,
              private quoteItemTypesService: QuoteItemTypesService,
              private quoteApplianceDetailsService: QuoteApplianceDetailsService,
              private applianceTypesService: ApplianceTypesService) {
    super();
  }

  init(quoteId: number) {

    this.quoteId = quoteId;

    this.columns = [
      {prop: 'description'},
      {prop: 'quantity'},
      {prop: 'quote', name: 'Net'}
    ];

    this.rows$ = combineLatest([
      this.quoteItemsService.entitiesByQuoteId(this.quoteId),
      this.quoteItemTypesService.entityMap$,
      this.applianceTypesService.entityMap$,
      this.quoteApplianceDetailsService.entities$,
    ]).pipe(
      map(([
             quoteItems,
             quoteItemTypeMap,
             applianceTypeMap,
             quoteApplianceDetails
           ]) => {

        return quoteItems.map(quoteItem => {

          let description = '';

          switch (quoteItemTypeMap[quoteItem.quoteItemTypeId].description) {
            case QuoteItemTypes.Appliance:
              description = this.getApplianceCoverDescription(quoteItem.id, quoteApplianceDetails, applianceTypeMap);
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
      quoteId: `this.quoteId`
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
}

