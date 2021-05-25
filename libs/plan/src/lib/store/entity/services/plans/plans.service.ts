import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Plan} from "@homecare/shared";
import {PlanEntity} from "../../plan.entities";


@Injectable({
  providedIn: 'root'
})
export class PlansService
  extends EntityCollectionServiceBase<Plan> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(PlanEntity.Plan, serviceElementsFactory);

  }

}
