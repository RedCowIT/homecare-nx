import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {ProductEntity} from '../product.entities';
import {AppliancePriceRange} from "@homecare/shared";


@Injectable({
  providedIn: 'root'
})
export class AppliancePriceRangesService
  extends EntityCollectionServiceBase<AppliancePriceRange> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.AppliancePriceRange, serviceElementsFactory);

  }

}
