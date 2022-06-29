import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {combineLatest, Observable} from "rxjs";
import {Product, selectEntity, SubscribedContainer} from "@homecare/shared";
import {ProductsService} from "@homecare/product";
import {map, mergeMap, takeUntil} from "rxjs/operators";
import {FinancePlanPeriodsService} from "../../../store/entity/services/finance-plan-periods/finance-plan-periods.service";
import {ProductStocksService} from "../../../../../../product/src/lib/store/entity/services/product-stocks.service";

@Component({
  selector: 'hc-finance-plan-form',
  templateUrl: './finance-plan-form.component.html',
  styleUrls: ['./finance-plan-form.component.scss']
})
export class FinancePlanFormComponent extends SubscribedContainer implements OnInit {

  @Input()
  formGroup: FormGroup;

  @Input()
  formGroupNameKey: string;

  products$: Observable<Product[]>;

  constructor(public productsService: ProductsService,
              public productStocksService: ProductStocksService,
              public financePlanPeriodsService: FinancePlanPeriodsService) {
    super();
  }

  ngOnInit(): void {
    // this.products$ = this.productsService.entities$;

    this.products$ = combineLatest([this.productStocksService.entities$, this.productsService.entityMap$])
      .pipe(
        map(([productStocks, productMap]) => {
          const products = [];
          for (const productStock of productStocks) {
            const product = productMap[productStock.productId];
            products.push({
              ...product,
              description: product.description + ` [${productStock.qty}]`,
              stock: productStock.qty
            });
          }
          return products;
        })
      );

    this.productStocksService.getAll();

    this.formGroup.get('financePlan.productId').valueChanges.pipe(
      mergeMap(productId => selectEntity(this.productsService, productId)),
      takeUntil(this.destroyed$)
    ).subscribe((product: Product) => {

      this.formGroup.patchValue({
        financePlan: {
          price: product.defaultPrice
        }
      });

    });
  }

}
