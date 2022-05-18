import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuoteProductDetailFormService} from "../../../services/form/quote-product-detail-form/quote-product-detail-form.service";
import {EntityFormContainer} from "@homecare/entity";
import {
  findByKey,
  firstByKey,
  firstItem,
  Product,
  QuoteItem,
  QuoteItemTypes,
  QuoteProductDetail,
  selectEntity,
  selectEntityByKey
} from "@homecare/shared";
import {QuoteItemsService} from "../../../store/entity/services/quote/quote-items/quote-items.service";
import {QuoteProductDetailsService} from "../../../store/entity/services/quote/quote-product-details/quote-product-details.service";
import {QuoteItemTypesService} from "../../../store/entity/services/quote/quote-item-types/quote-item-types.service";
import {DateService} from "@homecare/common";
import {filter, first, map, mergeMap} from "rxjs/operators";
import {combineLatest, Observable, of} from "rxjs";
import {CommercialProductsService, ProductsService} from "@homecare/product";

@Component({
  selector: 'hc-quote-product-detail-form',
  templateUrl: './quote-product-detail-form.component.html',
  styleUrls: ['./quote-product-detail-form.component.scss'],
  providers: [QuoteProductDetailFormService]
})
export class QuoteProductDetailFormComponent extends EntityFormContainer<QuoteProductDetail> implements OnInit {

  @Input()
  id: number;

  @Input()
  productId: number;

  @Input()
  quoteId: number;

  @Output()
  create = new EventEmitter<QuoteProductDetail>();

  @Output()
  update = new EventEmitter<QuoteProductDetail>();

  @Output()
  delete = new EventEmitter<QuoteProductDetail>();

  product$: Observable<Product>;

  productInfo$: Observable<{
    title: string,
    description: string,
    image_1: string
  }>;

  constructor(public formService: QuoteProductDetailFormService,
              public entityService: QuoteProductDetailsService,
              public quoteItemsService: QuoteItemsService,
              public quoteItemTypesService: QuoteItemTypesService,
              public productsService: ProductsService,
              public commercialProductsService: CommercialProductsService,
              public dateService: DateService) {
    super(formService, entityService);
  }

  ngOnInit(): void {

    super.ngOnInit();

    if (!this.isEditMode()) {
      this.patchForm({
        productId: this.productId
      });

      this.getExistingQuoteProductDetail().pipe(
        first()
      ).subscribe(quoteItemId => {
        if (quoteItemId) {
          this.patchForm({quoteItemId});
        }
      });
    }

    this.product$ = selectEntity(this.productsService, this.productId);

    this.product$.pipe(first()).subscribe(product => {
      this.patchForm({
        quote: product.defaultPrice
      });
    });

    this.productInfo$ = combineLatest([this.product$, this.commercialProductsService.entities$]).pipe(
      filter(([product, commercialProducts]) => {
        return !!product && !!firstByKey(commercialProducts, 'productId', product.id)
      }),
      map(([product, commercialProducts]) => {

        const commercialProduct = firstByKey(commercialProducts, 'productId', product.id);

        return {
          title: product.description,
          description: commercialProduct.description,
          image_1: commercialProduct.image_1
        }

      })
    );
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

        await this.doOperation(this.doCreate(dto as QuoteProductDetail), EntityFormContainer.OPERATION_CREATE);

      }
    });

  }

  protected createFormData(): Observable<Partial<QuoteProductDetail>> {

    const dto = this.createDTO() as any;

    if (dto.quoteItemId) {

      return selectEntityByKey(this.quoteItemTypesService, 'description', QuoteItemTypes.Product)
        .pipe(
          mergeMap(quoteItemTypes => {

            const quoteItemType = firstItem(quoteItemTypes);

            return this.quoteItemsService.update({
              id: dto.quoteItemId,
              quoteId: this.quoteId,
              quoteItemTypeId: quoteItemType.id,
              qty: 1,
              quote: dto.quote
            } as QuoteItem);
          }),
          map(() => {
            return dto;
          })
        );


    }

    return selectEntityByKey(this.quoteItemTypesService, 'description', QuoteItemTypes.Product)
      .pipe(
        mergeMap(quoteItemTypes => {

          const quoteItemType = firstItem(quoteItemTypes);

          return this.quoteItemsService.add({
            quoteId: this.quoteId,
            quoteItemTypeId: quoteItemType.id,
            qty: 1,
            quote: dto.quote
          } as QuoteItem);

        }),
        map(quoteItem => {
          dto.quoteItemId = quoteItem.id;
          return dto;
        }),
        first());
  }

  getExistingQuoteProductDetail(): Observable<QuoteProductDetail> {

    return combineLatest([
      this.quoteItemsService.entitiesByQuoteId(this.quoteId),
      this.entityService.entities$
    ]).pipe(
      map(([quoteItems, quoteProductDetails]) => {

        // get product details that match this id

        const productDetailsMatch = findByKey(quoteProductDetails, 'productId', this.productId);

        // get first match that has a quote item attached to this quote

        if (!productDetailsMatch.length) {
          return null;
        }

        const quoteProductDetailsMatch = productDetailsMatch.filter(productDetails => {
          return !!firstByKey(quoteItems, 'id', productDetails.quoteItemId);
        });

        return firstItem(quoteProductDetailsMatch);
      })
    );

  }

  protected doDelete(): Observable<string | number> {

    return this.model$.pipe(
      mergeMap(quoteProductDetail => {
          return this.quoteItemsService.delete(quoteProductDetail.quoteItemId);
        }
      ),
      map(() => 1));
  }
}
