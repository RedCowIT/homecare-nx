import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {firstItem, ProductCategory, selectEntityByKey} from "@homecare/shared";
import {ProductEntity} from '../product.entities';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService
  extends EntityCollectionServiceBase<ProductCategory> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.ProductCategory, serviceElementsFactory);

  }

  selectByDescription(description: string): Observable<ProductCategory> {
    return selectEntityByKey(this, 'description', description).pipe(
      map(entities => firstItem(entities))
    );
  }
}
