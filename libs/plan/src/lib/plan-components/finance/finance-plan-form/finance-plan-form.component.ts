import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Product, selectEntity, SubscribedContainer} from "@homecare/shared";
import {ProductsService} from "@homecare/product";
import {mergeMap, takeUntil} from "rxjs/operators";
import {FinancePlanPeriodsService} from "../../../store/entity/services/finance-plan-periods/finance-plan-periods.service";

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
              public financePlanPeriodsService: FinancePlanPeriodsService) {
    super();
  }

  ngOnInit(): void {
    this.products$ = this.productsService.entities$;

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
