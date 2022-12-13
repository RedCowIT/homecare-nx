import {Injectable} from "@angular/core";
import {TableSourceService} from "@homecare/common";
import {ProductsService} from "../../store/entity/services/products.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {ProductStocksService} from "../../store/entity/services/product-stocks.service";
import {ProductCategoriesService} from "../../store/entity/services/product-categories.service";

@Injectable()
export class StockTableService extends TableSourceService {
  customerId: number;

  hasInitialized: boolean;

  constructor(private productStockService: ProductStocksService,
              private productsService: ProductsService,
              private productCategoriesService: ProductCategoriesService) {
    super();
  }

  init() {

    this.columns = [
      {prop: 'code', flexGrow: 1},
      {prop: 'category', flexGrow: 1},
      {prop: 'product', flexGrow: 2},
      {prop: 'qty', flexGrow: 1, headerClass: "ion-text-end", cellClass: 'ion-text-end'},
    ];

    this.rows$ = combineLatest([
      this.productStockService.entities$,
      this.productsService.entityMap$,
      this.productCategoriesService.entityMap$
    ]).pipe(map(([
                   productStocks, productMap, productCategoryMap]) => {

        return productStocks.map(productStock => {
          const product = productMap[productStock.productId];
          if (!product) {
            console.error('Missing product ' + productStock.productId);
            return;
          }

          const category = productCategoryMap[product.categoryId];

          return {
            id: product.id,
            code: product.productCode,
            category: category.description,
            product: product.description,
            qty: productStock.qty
          }
        });

      })
    );

    this.hasInitialized = true;
  }

  load() {
    this.productStockService.getAll(
      {
        tag: 'StockTable'
      }
    );
  }
}
