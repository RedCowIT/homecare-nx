import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {CommercialProduct} from "@homecare/shared";
import {ProductEntity} from '../product.entities';


@Injectable({
  providedIn: 'root'
})
export class CommercialProductsService
  extends EntityCollectionServiceBase<CommercialProduct> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(ProductEntity.CommercialProduct, serviceElementsFactory);

  }

}
