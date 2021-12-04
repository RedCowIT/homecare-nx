import {Component, Input, OnInit} from '@angular/core';
import {QuotePlanDetailFormService} from "../../../services/form/quote-plan-detail-form/quote-plan-detail-form.service";
import {EntityFormContainer} from "@homecare/entity";
import {firstItem, Plan, QuoteItem, QuoteItemTypes, QuotePlanDetail, selectEntityByKey} from "@homecare/shared";
import {QuoteItemsService} from "../../../store/entity/services/quote/quote-items/quote-items.service";
import {QuoteItemTypesService} from "../../../store/entity/services/quote/quote-item-types/quote-item-types.service";
import {QuotePlanDetailsService} from "../../../store/entity/services/quote/quote-plan-details/quote-plan-details.service";
import {DateService} from "@homecare/common";
import {PlanPaymentPeriodsService, PlansService, PlanTypesService} from "@homecare/plan";
import {first, map, mergeMap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Component({
  selector: 'hc-quote-plan-detail-form',
  templateUrl: './quote-plan-detail-form.component.html',
  styleUrls: ['./quote-plan-detail-form.component.scss'],
  providers: [QuotePlanDetailFormService]
})
export class QuotePlanDetailFormComponent extends EntityFormContainer<QuotePlanDetail> implements OnInit {

  @Input()
  id: number;

  @Input()
  planTypeId: number;

  @Input()
  quoteId: number;

  plans$: Observable<Plan[]>;

  constructor(public formService: QuotePlanDetailFormService,
              public entityService: QuotePlanDetailsService,
              public planPaymentPeriodsService: PlanPaymentPeriodsService,
              public planTypesService: PlanTypesService,
              public plansService: PlansService,
              public quoteItemService: QuoteItemsService,
              public quoteItemTypesService: QuoteItemTypesService,
              public dateService: DateService) {
    super(formService, entityService);
  }

  ngOnInit(): void {

    super.ngOnInit();

    if (!this.isEditMode()) {
      this.patchForm({
        planTypeId: this.planTypeId
      });

      this.findApplianceQuoteItemId().pipe(
        first()
      ).subscribe(quoteItemId => {
        if (quoteItemId) {
          this.patchForm({quoteItemId});
        }
      });
    }

    console.log('planTypeId', this.planTypeId);

    this.plans$ = selectEntityByKey(this.plansService, 'planTypeId', this.planTypeId);
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

        await this.doOperation(this.doCreate(dto as QuotePlanDetail), EntityFormContainer.OPERATION_CREATE);

      }
    });

  }

  protected createFormData(): Observable<Partial<QuotePlanDetail>> {

    const dto = this.createDTO();

    if (dto.quoteItemId) {
      return of(dto);
    }

    return selectEntityByKey(this.quoteItemTypesService, 'description', QuoteItemTypes.Plan)
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

  protected doDelete(): Observable<string | number> {

    return this.model$.pipe(
      mergeMap(quotePlanDetail => {
        return this.entityService.delete(quotePlanDetail.quoteItemId).pipe(
          mergeMap(result => {
            return this.quoteItemService.delete(quotePlanDetail.quoteItemId);
          })
        )
      })
    );

  }

}
