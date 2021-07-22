import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Manufacturer} from "@homecare/shared";
import {ProductEntity} from '../product.entities';


@Injectable({
  providedIn: 'root'
})
export class ManufacturersService
  extends EntityCollectionServiceBase<Manufacturer> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.Manufacturer, serviceElementsFactory);

  }

}
