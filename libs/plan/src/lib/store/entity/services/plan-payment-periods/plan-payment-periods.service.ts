import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {PlanPaymentPeriod, PlanPaymentPeriods, selectFirstEntityByKey} from "@homecare/shared";
import {PlanEntity} from "../../plan.entities";
import {Observable} from "rxjs";


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

  selectMonthly(): Observable<PlanPaymentPeriod> {
    return this.selectByDescription(PlanPaymentPeriods.Monthly);
  }

  selectAnnual(): Observable<PlanPaymentPeriod>{
    return this.selectByDescription(PlanPaymentPeriods.Annual);
  }

  selectByDescription(description: string): Observable<PlanPaymentPeriod>{
    return selectFirstEntityByKey(this, 'description', description);
  }
}
