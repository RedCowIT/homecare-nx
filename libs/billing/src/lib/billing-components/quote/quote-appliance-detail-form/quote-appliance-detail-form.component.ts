import {Component, Input, OnInit} from '@angular/core';
import {EntityFormContainer} from "@homecare/entity";
import {firstItem, QuoteApplianceDetail, QuoteItem, QuoteItemTypes, selectEntityByKey} from "@homecare/shared";
import {AppliancePriceRangesService, ApplianceTypesService} from "@homecare/product";
import {QuoteApplianceDetailsService} from "../../../store/entity/services/quote-appliance-details/quote-appliance-details.service";
import {BrandsService} from "../../../../../../product/src/lib/store/entity/services/brands/brands.service";
import {QuoteApplianceDetailFormService} from "../../../services/form/quote-appliance-detail-form/quote-appliance-detail-form.service";
import {DateService} from "@homecare/common";
import {QuoteItemsService} from "../../../store/entity/services/quote-items/quote-items.service";
import {first, map, mergeMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {QuoteItemTypesService} from "../../../store/entity/services/quote-item-types/quote-item-types.service";

@Component({
  selector: 'hc-quote-appliance-detail-form',
  templateUrl: './quote-appliance-detail-form.component.html',
  styleUrls: ['./quote-appliance-detail-form.component.scss'],
  providers: [QuoteApplianceDetailFormService]
})
export class QuoteApplianceDetailFormComponent extends EntityFormContainer<QuoteApplianceDetail> implements OnInit {

  @Input()
  id: number;

  @Input()
  applianceTypeId: number;

  @Input()
  quoteId: number;

  constructor(public formService: QuoteApplianceDetailFormService,
              public entityService: QuoteApplianceDetailsService,
              public appliancePriceRangesService: AppliancePriceRangesService,
              public applianceTypesService: ApplianceTypesService,
              public brandsService: BrandsService,
              public quoteItemService: QuoteItemsService,
              public quoteItemTypesService: QuoteItemTypesService,
              public dateService: DateService) {
    super(formService, entityService);
  }

  ngOnInit(): void {

    super.ngOnInit();

    if (!this.isEditMode()) {
      this.patchForm({
        applianceTypeId: this.applianceTypeId
      });

      this.findApplianceQuoteItemId().pipe(
        first()
      ).subscribe(quoteItemId => {
        if (quoteItemId) {
          this.patchForm({quoteItemId});
        }
      });
    }
  }

  public async submit() {

    this.isSubmitted = true;

    this.errors = null;

    this.createFormData().pipe(first()).subscribe(async dto => {
      if (this.formService.editMode) {

        await this.doOperation(
          this.doUpdate(dto),
          EntityFormContainer.OPERATION_UPDATE);

      } else {

        await this.doOperation(this.doCreate(dto as QuoteApplianceDetail), EntityFormContainer.OPERATION_CREATE);

      }
    });

  }

  protected createFormData(): Observable<Partial<QuoteApplianceDetail>> {

    const dto = this.createDTO();

    if (dto.quoteItemId) {
      return of(dto);
    }

    return selectEntityByKey(this.quoteItemTypesService, 'description', QuoteItemTypes.Appliance)
      .pipe(
        mergeMap(quoteItemTypes => {

          const quoteItemType = firstItem(quoteItemTypes);

          return this.quoteItemService.add({
            quoteId: this.quoteId,
            quoteItemTypeId: quoteItemType.id
          } as QuoteItem);

        }),
        map(quoteItem => {
          dto.quoteItemId = quoteItem.id;
          return dto;
        }),
        first());
  }

  /**
   * TODO:
   * If a quote appliance detail save fails, we could end up with an orphaned quote item.
   * This function should retrieve it for subsequent use.
   *
   * @protected
   */
  protected findApplianceQuoteItemId(): Observable<number> {
    return of(null);
  }

}
