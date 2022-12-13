import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {ProductEntity} from '../product.entities';
import {ApplianceTumbleDryerType} from "@homecare/shared";


@Injectable({
  providedIn: 'root'
})
export class ApplianceTumbleDryerTypesService
  extends EntityCollectionServiceBase<ApplianceTumbleDryerType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.ApplianceTumbleDryerType, serviceElementsFactory);

  }

}
