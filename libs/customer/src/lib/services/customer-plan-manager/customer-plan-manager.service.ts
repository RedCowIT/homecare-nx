import {Injectable} from '@angular/core';
import {combineLatest, forkJoin, Observable, of, throwError} from "rxjs";
import {
  CustomerPlanFinanceDocument,
  firstByKey,
  InvoiceItem,
  InvoiceItemTypes,
  PlanTypes,
  selectOrFetchFirstEntityByKey
} from "@homecare/shared";
import {catchError, first, map, mergeMap} from "rxjs/operators";

import {PlansService, PlanTypesService} from "@homecare/plan";
import {CustomerPlanFinanceDocumentsService} from "../../store/entity/services/customer-plan-finance-documents/customer-plan-finance-documents.service";
import {CustomerPlansService} from "../../store/entity/services/customer-plans/customer-plans.service";

/**
 * Helper class to load invoices and related items, plans, finance docs, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerPlanManagerService {

  constructor(private customerPlanFinanceDocumentsService: CustomerPlanFinanceDocumentsService,
              private plansService: PlansService,
              private planTypesService: PlanTypesService,
              private customerPlansService: CustomerPlansService) {
  }

  appointmentHasFinanceDocs(appointmentId: number): Observable<boolean> {

    return this.appointmentFinanceDocs(appointmentId).pipe(
      map(docs => {
        return docs?.length > 0;
      }));

  }

  appointmentFinanceDocs(appointmentId: number): Observable<CustomerPlanFinanceDocument[]> {
    return combineLatest([
      this.customerPlanFinanceDocumentsService.entities$,
      this.customerPlansService.entityMap$
    ]).pipe(
      map(([customerPlanFinanceDocuments, customerPlanMap]) => {

        return customerPlanFinanceDocuments.filter(
          customerPlanFinanceDoc => {
            const plan = customerPlanMap[customerPlanFinanceDoc.customerPlanId];
            if (!plan) {
              throw new Error('No plan for doc with customerPlanId: ' + customerPlanFinanceDoc.customerPlanId);
            }
            return plan.appointmentId === appointmentId;
          }
        );
      })
    )
  }
}
