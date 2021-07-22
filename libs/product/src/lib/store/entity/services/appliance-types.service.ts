import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {ProductEntity} from '../product.entities';
import {ApplianceType} from "@homecare/shared";


@Injectable({
  providedIn: 'root'
})
export class ApplianceTypesService
  extends EntityCollectionServiceBase<ApplianceType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.ApplianceType, serviceElementsFactory);

  }

}
