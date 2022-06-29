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
import {InvoiceItemsService} from "../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {InvoiceItemTypesService} from "../../../store/entity/services/invoice/invoice-item-types/invoice-item-types.service";
import {CustomerPlansService} from "@homecare/customer";
import {InvoicesService} from "../../../store/entity";
import {CustomerPlanFinanceDocumentsService} from "../../../../../../customer/src/lib/store/entity/services/customer-plan-finance-documents/customer-plan-finance-documents.service";
import {PlansService, PlanTypesService} from "@homecare/plan";

/**
 * Helper class to load invoices and related items, plans, finance docs, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class InvoiceManagerService {

  constructor(private invoicesService: InvoicesService,
              private invoiceItemsService: InvoiceItemsService,
              private invoiceItemTypesService: InvoiceItemTypesService,
              private customerPlanFinanceDocumentsService: CustomerPlanFinanceDocumentsService,
              private plansService: PlansService,
              private planTypesService: PlanTypesService,
              private customerPlansService: CustomerPlansService) {
  }


  // Ensure customer plans are loaded first
  loadAppointmentInvoice(appointmentId: number): Observable<boolean> {
    return selectOrFetchFirstEntityByKey(this.invoicesService, 'appointmentId', appointmentId)
      .pipe(
        first(),
        mergeMap(invoice => {

            if (!invoice) {
              return of(false);
            }

            return combineLatest([

              this.invoiceItemsService.getWithQuery({
                invoiceId: `${invoice.id}`
              }),

              this.invoiceItemTypesService.entityMap$,

              this.customerPlansService.entities$,

              this.plansService.entityMap$,

              this.planTypesService.entityMap$

            ]).pipe(
              first(),
              mergeMap(([
                          invoiceItems,
                          invoiceItemTypeMap,
                          customerPlans,
                          planMap,
                          planTypeMap
                        ]) => {

                const planLoads = [];

                for (const invoiceItem of invoiceItems) {

                  const customerPlan = firstByKey(customerPlans, 'invoiceItemId', invoiceItem.id);

                  if (customerPlan) {

                    const plan = planMap[customerPlan.planId];
                    const planType = planTypeMap[plan.planTypeId];

                    if (planType.description === PlanTypes.Finance) {

                      planLoads.push(this.customerPlanFinanceDocumentsService.getWithQuery({
                        customerPlanId: `${customerPlan.id}`
                      }));
                    }
                  }

                }
                if (planLoads.length) {
                  return forkJoin(planLoads).pipe(first(), map(() => true));
                } else {
                  return of(true);
                }
              }),
              catchError(error => {
                console.error('Failed to load appointmentinvoice', error);
                return throwError(error);
              })
            );


          }
        ));
  }

  loadInvoiceItem(invoiceItem: InvoiceItem) {

  }
}
