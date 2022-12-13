import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {ProductEntity} from '../product.entities';
import {ApplianceFuelType} from "@homecare/shared";


@Injectable({
  providedIn: 'root'
})
export class ApplianceFuelTypesService
  extends EntityCollectionServiceBase<ApplianceFuelType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.ApplianceFuelType, serviceElementsFactory);

  }

}
