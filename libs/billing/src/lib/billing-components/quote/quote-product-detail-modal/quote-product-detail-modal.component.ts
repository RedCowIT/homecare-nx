import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {
  firstItem,
  Product,
  QuoteItem,
  QuoteItemTypes,
  QuoteProductDetail,
  selectEntity,
  selectEntityByKey
} from "@homecare/shared";
import {ProductsService} from "@homecare/product";
import {first, map, mergeMap} from "rxjs/operators";

import {QuoteItemsService} from '../../../store/entity/services/quote-items/quote-items.service';
import {QuoteItemTypesService} from '../../../store/entity/services/quote-item-types/quote-item-types.service';
import {QuoteProductDetailsService} from '../../../store/entity/services/quote-product-details/quote-product-details.service';
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

  constructor(public productsService: ProductsService,
              public quoteItemsService: QuoteItemsService,
              public quoteItemTypesService: QuoteItemTypesService,
              public quoteProductDetailsService: QuoteProductDetailsService,
              public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.product$ = selectEntity(this.productsService, this.productId);
  }

  addProduct() {
    selectEntityByKey(this.quoteItemTypesService, 'description', QuoteItemTypes.Product)
      .pipe(
        mergeMap(quoteItemTypes => {

          const quoteItemType = firstItem(quoteItemTypes);

          return this.quoteItemsService.add({
            quoteId: this.quoteId,
            quoteItemTypeId: quoteItemType.id
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
}
