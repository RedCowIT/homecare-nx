import {Component, Input, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {
  CommercialProduct, findByKey, firstByKey,
  firstItem,
  Product,
  QuoteItem,
  QuoteItemTypes,
  QuoteProductDetail,
  selectEntity,
  selectEntityByKey
} from "@homecare/shared";
import {CommercialProductsService, ProductsService} from "@homecare/product";
import {filter, first, map, mergeMap} from "rxjs/operators";

import {QuoteItemsService} from '../../../store/entity/services/quote/quote-items/quote-items.service';
import {QuoteItemTypesService} from '../../../store/entity/services/quote/quote-item-types/quote-item-types.service';
import {QuoteProductDetailsService} from '../../../store/entity/services/quote/quote-product-details/quote-product-details.service';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'hc-quote-product-detail-modal',
  templateUrl: './quote-product-detail-modal.component.html',
  styleUrls: ['./quote-product-detail-modal.component.scss']
})
export class QuoteProductDetailModalComponent implements OnInit {

  @Input()
  quoteId: number;

  @Input()
  productId: number;

  product$: Observable<Product>;

  title = '';

  productInfo$: Observable<{
    title: string,
    description: string,
    image_1: string,
    price: number
  }>;

  constructor(public productsService: ProductsService,
              public commercialProductsService: CommercialProductsService,
              public quoteItemsService: QuoteItemsService,
              public quoteItemTypesService: QuoteItemTypesService,
              public quoteProductDetailsService: QuoteProductDetailsService,
              public modalCtrl: ModalController) {
  }

  ngOnInit(): void {

    this.product$ = selectEntity(this.productsService, this.productId);

    this.productInfo$ = combineLatest([this.product$, this.commercialProductsService.entities$]).pipe(
      filter(([product, commercialProducts]) => {
        return !!product && !!firstByKey(commercialProducts, 'productId', product.id)
      }),
      map(([product, commercialProducts]) => {

        const commercialProduct = firstByKey(commercialProducts, 'productId', product.id);

        return {
          title: product.description,
          description: commercialProduct.description,
          image_1: commercialProduct.image_1,
          price: product.defaultPrice
        }

      })
    );

    this.product$.pipe(first()).subscribe(product => {
      this.title = product.description;
    });
  }

  addProduct() {
    selectEntityByKey(this.quoteItemTypesService, 'description', QuoteItemTypes.Product)
      .pipe(
        mergeMap(quoteItemTypes => {

          const quoteItemType = firstItem(quoteItemTypes);

          return this.quoteItemsService.add({
            quoteId: this.quoteId,
            quoteItemTypeId: quoteItemType.id,
            qty: 1
          } as QuoteItem);

        }),
        mergeMap(quoteItem => {
          return this.quoteProductDetailsService.add({
            quoteItemId: quoteItem.id,
            productId: this.productId
          } as QuoteProductDetail);
        }),
        first()).subscribe(async () => {
      await this.modalCtrl.dismiss();
    });
  }

  getExistingQuoteProductDetail(): Observable<QuoteProductDetail> {

    return combineLatest([
      this.quoteItemsService.entitiesByQuoteId(this.quoteId),
      this.quoteProductDetailsService.entities$
    ]).pipe(
      map(([quoteItems, quoteProductDetails]) => {

        // get product details that match this id

        const productDetailsMatch = findByKey(quoteProductDetails, 'productId', this.productId);

        // get first match that has a quote item attached to this quote

        if (!productDetailsMatch.length){
          return null;
        }

        const quoteProductDetailsMatch = productDetailsMatch.filter(productDetails => {
          return !!firstByKey(quoteItems, 'id', productDetails.quoteItemId);
        });

        return firstItem(quoteProductDetailsMatch);
      })
    );

  }

  remove(quoteProductDetail: QuoteProductDetail){

    this.quoteProductDetailsService.delete(quoteProductDetail.id).pipe(
      mergeMap(() => {
        return this.quoteItemsService.delete(quoteProductDetail.quoteItemId)
      }),
      first()
    ).subscribe(async () => {
      await this.modalCtrl.dismiss();
    });

  }
}
