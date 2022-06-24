import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {CustomerPlanChange, selectEntityByKey} from "@homecare/shared";
import {CustomerEntity} from "../../customer.entities";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ApiUrlService} from "@homecare/common";

@Injectable({
  providedIn: 'root'
})
export class CustomerPlanChangesService
  extends EntityCollectionServiceBase<CustomerPlanChange> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory,
    protected httpClient: HttpClient,
    protected apiUrlService: ApiUrlService,) {

    super(CustomerEntity.CustomerPlanChange, serviceElementsFactory);

  }

  appointmentPlanChanges(appointmentId: number): Observable<CustomerPlanChange[]> {
    return selectEntityByKey(this, 'appointmentId', appointmentId);
  }

  hasPlanChanges(appointmentId: number): Observable<boolean> {
    return this.appointmentPlanChanges(appointmentId).pipe(
      map(customerPlanChanges => customerPlanChanges.filter(customerPlanChange => customerPlanChange.canIncrease)),
      map(customerPlanChanges => {
        return customerPlanChanges.length > 0;
      })
    );
  }

  addAll(customerPlanChanges: CustomerPlanChange[]): Observable<any> {

    return this.httpClient.post(this.addAllUrl(), customerPlanChanges).pipe(
      map((response: any) => {
        return true;
      })
    );

  }

  addAllUrl(): string {
    return this.apiUrlService.url('customerPlanChanges');
  }
}
