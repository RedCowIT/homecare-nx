import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Product} from "@homecare/shared";
import {ProductEntity} from '../product.entities';


@Injectable({
  providedIn: 'root'
})
export class ProductsService
  extends EntityCollectionServiceBase<Product> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.Product, serviceElementsFactory);

  }

}
