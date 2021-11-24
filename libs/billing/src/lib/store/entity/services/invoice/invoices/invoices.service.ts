import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {firstItem, Invoice, selectEntityByKey} from "@homecare/shared";
import {BillingEntity} from '../../../billing.entities';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InvoicesService
  extends EntityCollectionServiceBase<Invoice> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(BillingEntity.Invoice, serviceElementsFactory);

  }

  public getAppointmentInvoice(appointmentId: number): Observable<Invoice> {
    return selectEntityByKey(this, 'appointmentId', appointmentId).pipe(
      map(invoices => firstItem(invoices))
    );
  }

}
