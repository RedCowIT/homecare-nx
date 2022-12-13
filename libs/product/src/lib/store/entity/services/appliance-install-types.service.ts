import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {ProductEntity} from '../product.entities';
import {ApplianceInstallType} from "@homecare/shared";


@Injectable({
  providedIn: 'root'
})
export class ApplianceInstallTypesService
  extends EntityCollectionServiceBase<ApplianceInstallType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.ApplianceInstallType, serviceElementsFactory);

  }

}
