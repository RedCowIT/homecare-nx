import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Title} from "@homecare/shared";
import {CustomerEntity} from "../../customer.entities";

@Injectable({
  providedIn: 'root'
})
export class TitlesService
  extends EntityCollectionServiceBase<Title> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(CustomerEntity.Title, serviceElementsFactory);

  }

}
