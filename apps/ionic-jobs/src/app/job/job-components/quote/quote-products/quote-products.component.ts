import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {ButtonConfig} from "@homecare/common";
import {createFooterBackButton, createFooterNextButton} from "../../../support/footer-button-factory";
import {findByKey, firstItem, QuoteSection} from "@homecare/shared";
import {CurrentJobService} from "../../../services/current-job/current-job.service";
import {first, map} from "rxjs/operators";
import {CommercialProductsService} from "../../../../../../../../libs/product/src/lib/store/entity/services/commercial-products.service";
import {ProductsService} from "../../../../../../../../libs/product/src/lib/store/entity/services/products.service";
import {QuoteManagerService} from "../../../../../../../../libs/billing/src/lib/services/quote-manager/quote-manager.service";
import {QuoteApplianceDetailModalComponent} from "../../../../../../../../libs/billing/src/lib/billing-components/quote/quote-appliance-detail-modal/quote-appliance-detail-modal.component";
import {ModalController} from "@ionic/angular";
import {QuoteProductDetailModalComponent} from "../../../../../../../../libs/billing/src/lib/billing-components/quote/quote-product-detail-modal/quote-product-detail-modal.component";

@Component({
  selector: 'hc-quote-products',
  templateUrl: './quote-products.component.html',
  styleUrls: ['./quote-products.component.scss']
})
export class QuoteProductsComponent implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  iconTiles$: Observable<Array<{ label: string, icon: string, badge?: string, id: number, highlight: boolean }>>;

  constructor(public currentJobService: CurrentJobService,
              public commercialProductsService: CommercialProductsService,
              public productsService: ProductsService,
              public quoteManagerService: QuoteManagerService,
              public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.footerButtons$.next([
      createFooterBackButton(async () => {

        this.currentJobService.navToPrevQuoteSection(QuoteSection.Products);

      }),
      createFooterNextButton(async () => {

        this.currentJobService.completeQuoteSection(QuoteSection.Products);

      })
    ]);

    this.iconTiles$ = combineLatest([
      this.commercialProductsService.entities$,
      this.productsService.entityMap$,
      this.quoteManagerService.getQuoteProductDetails(this.currentJobService.appointmentId)
    ]).pipe(
      map(([commercialProducts, productMap, quoteProductDetails]) => {

        return commercialProducts.map(commercialProduct => {

          const product = productMap[commercialProduct.productId];
          const quoteProductDetailsMatch = findByKey(quoteProductDetails, 'productId', product.id);

          return {
            id: product.id,
            label: product.description,
            icon: commercialProduct.icon,
            badge: quoteProductDetailsMatch.length > 0 ? '&check;' : '',
            highlight: quoteProductDetailsMatch.length > 0 //change
          }
        })
      })
    );


  }

  async openProductModal(productId: number) {

    this.currentJobService.quote$.pipe(first()).subscribe(async quote => {
      const modal = await this.modalCtrl.create({
        component: QuoteProductDetailModalComponent,
        componentProps: {
          productId,
          quoteId: quote.id
        }
      });

      await modal.present();
    });

  }

}
