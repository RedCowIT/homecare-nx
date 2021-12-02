import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';

import {ApplianceBrand} from "@homecare/shared";
import {ProductEntity} from "../product.entities";


@Injectable({
  providedIn: 'root'
})
export class ApplianceBrandsService
  extends EntityCollectionServiceBase<ApplianceBrand> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.ApplianceBrand, serviceElementsFactory);

  }

}
