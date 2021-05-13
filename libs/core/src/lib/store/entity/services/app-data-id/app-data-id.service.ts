import {CoreEntity} from "../../core.entities";
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppDataIdService
  extends EntityCollectionServiceBase<CoreEntity.AppDataId> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(CoreEntity.AppDataId, serviceElementsFactory);

  }

}
