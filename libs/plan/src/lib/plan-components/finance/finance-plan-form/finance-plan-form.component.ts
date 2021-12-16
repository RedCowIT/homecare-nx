import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Product} from "@homecare/shared";
import {ProductsService} from "@homecare/product";

@Component({
  selector: 'hc-finance-plan-form',
  templateUrl: './finance-plan-form.component.html',
  styleUrls: ['./finance-plan-form.component.scss']
})
export class FinancePlanFormComponent implements OnInit {

  @Input()
  formGroup: FormGroup;

  @Input()
  formGroupNameKey: string;

  products$: Observable<Product[]>;

  constructor(public productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.products$ = this.productsService.entities$;
  }


}
