import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {PlanType} from "@homecare/shared";
import {PlanEntity} from "../../plan.entities";


@Injectable({
  providedIn: 'root'
})
export class PlanTypesService
  extends EntityCollectionServiceBase<PlanType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(PlanEntity.PlanType, serviceElementsFactory);

  }

}
