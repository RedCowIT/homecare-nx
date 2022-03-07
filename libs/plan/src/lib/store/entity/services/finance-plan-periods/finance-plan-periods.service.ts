import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {FinancePlanPeriod} from "@homecare/shared";
import {PlanEntity} from "../../plan.entities";


@Injectable({
  providedIn: 'root'
})
export class FinancePlanPeriodsService
  extends EntityCollectionServiceBase<FinancePlanPeriod> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(PlanEntity.FinancePlanPeriod, serviceElementsFactory);

  }
}
