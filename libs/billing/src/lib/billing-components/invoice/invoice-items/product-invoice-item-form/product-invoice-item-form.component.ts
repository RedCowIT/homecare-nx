import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  ApiValidationErrors,
  catchHttpValidationErrors,
  InvoiceItem,
  Product,
  ProductCategory,
  selectEntity,
  SubscribedContainer
} from "@homecare/shared";
import {EMPTY, Observable} from "rxjs";
import {first, mergeMap, takeUntil} from "rxjs/operators";
import {InvoiceItemsService} from '../../../../store/entity/services/invoice/invoice-items/invoice-items.service';
import {ProductInvoiceItemFormService} from "../../../../services/form/invoice/product-invoice-item-form/product-invoice-item-form.service";
import {ProductCategoriesService, ProductsService} from "@homecare/product";

@Component({
  selector: 'hc-product-invoice-item-form',
  templateUrl: './product-invoice-item-form.component.html',
  styleUrls: ['./product-invoice-item-form.component.scss'],
  providers: [ProductInvoiceItemFormService]
})
export class ProductInvoiceItemFormComponent extends SubscribedContainer implements OnInit {

  @Input()
  invoiceId: number;

  @Input()
  categoryId: number;

  @Input()
  invoiceItemId: number;

  @Input()
  invoiceItemTypeId: number;

  @Output()
  done = new EventEmitter<void>();

  productCategory$: Observable<ProductCategory> | null;

  products$: Observable<Product[]> | null;

  invoiceItem: InvoiceItem;

  editMode = false;

  errors = [];

  constructor(public formService: ProductInvoiceItemFormService,
              public invoiceItemsService: InvoiceItemsService,
              public productCategoriesService: ProductCategoriesService,
              public productsService: ProductsService) {
    super();
  }

  ngOnInit(): void {

    this.productCategory$ = selectEntity(this.productCategoriesService, this.categoryId);

    this.products$ = this.productsService.getWithQuery({
      'categoryId': `${this.categoryId}`
    });

    this.formService.form.get('productId').valueChanges.pipe(
      mergeMap(productId => selectEntity(this.productsService, productId)),
      takeUntil(this.destroyed$)
    ).subscribe((product: Product) => {

      this.formService.form.patchValue({
        unitPrice: product.defaultPrice
      });

    });

    if (this.invoiceItemId) {
      this.formService.editMode = true;
      selectEntity(this.invoiceItemsService, this.invoiceItemId).pipe(first()).subscribe(invoiceItem => {
        this.formService.form.patchValue(invoiceItem);
      });
    } else {
      this.formService.form.patchValue({
        invoiceId: this.invoiceId,
        invoiceItemTypeId: this.invoiceItemTypeId
      });
    }

  }

  save() {
    if (this.formService.editMode) {
      this.updateInvoiceItem();
    } else {
      this.createInvoiceItem();
    }
  }

  createInvoiceItem() {
    this.invoiceItemsService.add(this.formService.createDTO<InvoiceItem>() as InvoiceItem).pipe(
      catchHttpValidationErrors((errors: ApiValidationErrors) => {
        this.errors = errors.errors;
        return EMPTY;
      }),
      first()
    ).subscribe(() => {this.done.emit()});
  }

  updateInvoiceItem() {
    this.invoiceItemsService.update(this.formService.createDTO<InvoiceItem>() as InvoiceItem).pipe(
      catchHttpValidationErrors((errors: ApiValidationErrors) => {
        this.errors = errors.errors;
        return EMPTY;
      }),
      first()
    ).subscribe(() => {this.done.emit()});
  }
}
