import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {ProductEntity} from '../product.entities';
import {ApplianceModel} from "@homecare/shared";


@Injectable({
  providedIn: 'root'
})
export class ApplianceModelsService
  extends EntityCollectionServiceBase<ApplianceModel> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.ApplianceModel, serviceElementsFactory);

  }

}
