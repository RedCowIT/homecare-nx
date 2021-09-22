import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {PlanType} from "@homecare/shared";
import {PlanEntity} from "../../plan.entities";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


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

  public getCommercialPlanTypes(): Observable<PlanType[]> {
    return this.entities$.pipe(
      map(planTypes => {
        return planTypes.filter(planType => planType.commercial)
      })
    );
  }

}
