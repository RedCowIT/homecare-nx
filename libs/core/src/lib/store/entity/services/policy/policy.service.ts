import {CoreEntity} from "../../core.entities";
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Injectable} from '@angular/core';
import {Policy} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class PolicyService
  extends EntityCollectionServiceBase<Policy> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(CoreEntity.Policy, serviceElementsFactory);

  }

}
