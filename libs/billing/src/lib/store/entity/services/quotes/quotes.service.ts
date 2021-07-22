import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {firstItem, Quote, selectEntityByKey} from "@homecare/shared";
import {BillingEntity} from '../../billing.entities';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuotesService
  extends EntityCollectionServiceBase<Quote> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.Quote, serviceElementsFactory);

  }

  public getAppointmentQuote(appointmentId: number): Observable<Quote> {
    return selectEntityByKey(this, 'appointmentId', appointmentId).pipe(
      map(quotes => firstItem(quotes))
    );
  }

}
