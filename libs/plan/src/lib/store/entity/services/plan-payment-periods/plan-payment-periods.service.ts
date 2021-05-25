import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {PlanPaymentPeriod} from "@homecare/shared";
import {PlanEntity} from "../../plan.entities";


@Injectable({
  providedIn: 'root'
})
export class PlanPaymentPeriodsService
  extends EntityCollectionServiceBase<PlanPaymentPeriod> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(PlanEntity.PlanPaymentPeriod, serviceElementsFactory);

  }

}
