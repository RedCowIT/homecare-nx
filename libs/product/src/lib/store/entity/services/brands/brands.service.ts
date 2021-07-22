import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';

import {Brand} from "@homecare/shared";
import {ProductEntity} from "../../product.entities";


@Injectable({
  providedIn: 'root'
})
export class BrandsService
  extends EntityCollectionServiceBase<Brand> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.Brand, serviceElementsFactory);

  }

}
