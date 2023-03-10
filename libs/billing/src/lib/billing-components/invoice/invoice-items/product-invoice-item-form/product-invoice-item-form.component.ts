import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  ApiValidationErrors,
  catchHttpValidationErrors, firstItem,
  InvoiceItem, parseApiValidationErrors,
  Product,
  ProductCategory, ProductStock,
  selectEntity, selectEntityByKey, selectOrFetchFirstEntityByKey,
  SubscribedContainer
} from "@homecare/shared";
import {combineLatest, EMPTY, merge, Observable} from "rxjs";
import {finalize, first, map, mergeMap, takeUntil} from "rxjs/operators";
import {InvoiceItemsService} from '../../../../store/entity/services/invoice/invoice-items/invoice-items.service';
import {ProductInvoiceItemFormService} from "../../../../services/form/invoice/product-invoice-item-form/product-invoice-item-form.service";
import {ProductCategoriesService, ProductsService} from "@homecare/product";
import {ProductStocksService} from "../../../../../../../product/src/lib/store/entity/services/product-stocks.service";

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

  @Input()
  productId: number;

  @Input()
  stockOnly: boolean;

  @Input()
  deleteOnly: boolean;

  @Output()
  done = new EventEmitter<void>();

  productCategory$: Observable<ProductCategory> | null;

  products$: Observable<Product[]> | null;

  invoiceItem: InvoiceItem;

  productStock: ProductStock;

  editMode = false;

  deleting = false;

  errors = [];

  constructor(public formService: ProductInvoiceItemFormService,
              public invoiceItemsService: InvoiceItemsService,
              public productCategoriesService: ProductCategoriesService,
              public productStockService: ProductStocksService,
              public productsService: ProductsService) {
    super();
  }

  ngOnInit(): void {

    this.productCategory$ = selectEntity(this.productCategoriesService, this.categoryId);

    if (this.categoryId) {
      this.products$ = selectEntityByKey(this.productsService, 'categoryId', this.categoryId);
    } else {

      if (this.stockOnly) {
        this.products$ = combineLatest([this.productStockService.entities$, this.productsService.entityMap$])
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

        this.productStockService.getAll();
      } else {

        if (this.deleteOnly) {

          if (this.invoiceItemId) {

            this.products$ =
              combineLatest([
                selectEntity(this.invoiceItemsService, this.invoiceItemId),
                this.productsService.entityMap$]).pipe(
                map(([invoiceItem, productMap]) => {
                  if (invoiceItem) {
                    return [productMap[invoiceItem.productId]];
                  }
                  return [];
                })
              );

          }

        } else {
          this.products$ = this.productsService.entities$;
        }

      }
    }

    // this.products$ = this.productsService.getWithQuery({
    //   'categoryId': `${this.categoryId}`
    // });

    this.formService.form.get('productId').valueChanges.pipe(
      mergeMap(productId => selectEntity(this.productsService, productId)),
      takeUntil(this.destroyed$)
    ).subscribe((product: Product) => {

      this.formService.form.patchValue({
        unitPrice: product.defaultPrice
      });

      this.productStock = null;
      if (this.stockOnly) {
        selectOrFetchFirstEntityByKey(this.productStockService, 'productId', product.id)
          .pipe(first()).subscribe(
          productStock => {
            this.productStock = productStock;
            this.formService.setStockQuantity(this.productStock.qty);
          }
        )
      } else {
        this.formService.setStockQuantity(undefined);
      }

      // this.productStockService.getWithQuery({
      //   productId: `${product.id}`
      // }).pipe(first()).subscribe(productStocks => {
      //   this.productStock = firstItem(productStocks);
      // })

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

  delete() {
    if (this.deleting) {
      return;
    }
    this.deleting = true;
    this.invoiceItemsService.delete(this.invoiceItemId).pipe(first(), finalize(() => {
      this.deleting = true;
    })).subscribe(() => {
      this.done.emit();
    });
  }

  createInvoiceItem() {

    this.invoiceItemsService.add(this.formService.createDTO<InvoiceItem>() as InvoiceItem).pipe(
      catchHttpValidationErrors((errors: ApiValidationErrors) => {

        this.errors = parseApiValidationErrors(errors);

        return EMPTY;
      }),
      first()
    ).subscribe(() => {
      this.done.emit()
    });
  }

  updateInvoiceItem() {
    this.invoiceItemsService.update(this.formService.createDTO<InvoiceItem>() as InvoiceItem).pipe(
      catchHttpValidationErrors((errors: ApiValidationErrors) => {

        this.errors = parseApiValidationErrors(errors);

        return EMPTY;
      }),
      first()
    ).subscribe(() => {
      this.done.emit()
    });
  }

  productSearch(term: string, item: any): boolean {
    if (!term) {
      return false;
    }
    const termLower = term.toLowerCase();
    return item.description.toLowerCase().includes(termLower) || item.productCode?.toLowerCase().includes(termLower);
  }
}
