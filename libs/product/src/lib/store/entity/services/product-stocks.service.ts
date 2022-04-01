import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {firstItem, ProductStock, selectEntityByKey} from "@homecare/shared";
import {ProductEntity} from '../product.entities';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProductStocksService
  extends EntityCollectionServiceBase<ProductStock> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.ProductStock, serviceElementsFactory);

  }

  selectByProduct(productId: string): Observable<ProductStock> {
    return selectEntityByKey(this, 'productId', productId).pipe(
      map(entities => firstItem(entities))
    );
  }
}
