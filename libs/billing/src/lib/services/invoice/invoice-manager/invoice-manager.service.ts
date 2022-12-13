import {Injectable} from '@angular/core';
import {combineLatest, forkJoin, Observable, of, throwError} from "rxjs";
import {
  CustomerPlanFinanceDocument, findById, findByKey,
  firstByKey, Invoice,
  InvoiceItem,
  InvoiceItemTypes,
  PlanTypes, removeMissingFromCache,
  selectOrFetchFirstEntityByKey
} from "@homecare/shared";
import {catchError, first, map, mergeMap, tap} from "rxjs/operators";
import {InvoiceItemsService} from "../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {InvoiceItemTypesService} from "../../../store/entity/services/invoice/invoice-item-types/invoice-item-types.service";
import {CustomerPlansService} from "@homecare/customer";
import {InvoicesService} from "../../../store/entity";
import {CustomerPlanFinanceDocumentsService} from "../../../../../../customer/src/lib/store/entity/services/customer-plan-finance-documents/customer-plan-finance-documents.service";
import {PlansService, PlanTypesService} from "@homecare/plan";
import {Store} from "@ngrx/store";
import {invoiceLoaded} from "../../../store/actions/billing.actions";

/**
 * Helper class to load invoices and related items, plans, finance docs, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class InvoiceManagerService {

  constructor(private store: Store,
              private invoicesService: InvoicesService,
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

            console.log('Loading appointment invoice relations', invoice);

            if (!invoice) {
              return of(false);
            }

            return combineLatest([

              this.invoiceItemsService.getWithQuery({
                invoiceId: `${invoice.id}`
              }),

              this.invoiceItemTypesService.entityMap$,

              this.customerPlansService.getWithQuery({
                customerId: `${invoice.customerId}`
              }),

              this.customerPlanFinanceDocumentsService.entities$,

              this.plansService.entityMap$,

              this.planTypesService.entityMap$

            ]).pipe(
              first(),
              mergeMap(([
                          invoiceItems,
                          invoiceItemTypeMap,
                          customerPlans,
                          customerPlanFinanceDocuments,
                          planMap,
                          planTypeMap
                        ]) => {

                const planLoads = [];

                console.log('Remove missing invoice items', invoiceItems);

                removeMissingFromCache(this.invoiceItemsService, invoiceItems, {key: 'invoiceId', value: invoice.id});

                const appointmentCustomerPlans = [];

                for (const invoiceItem of invoiceItems) {

                  const customerPlan = firstByKey(customerPlans, 'invoiceItemId', invoiceItem.id);

                  if (customerPlan) {

                    appointmentCustomerPlans.push(customerPlan);

                    const plan = planMap[customerPlan.planId];
                    const planType = planTypeMap[plan.planTypeId];

                    if (planType.description === PlanTypes.Finance) {

                      planLoads.push(this.customerPlanFinanceDocumentsService.getWithQuery({
                        customerPlanId: `${customerPlan.id}`
                      }));
                    }
                  }

                }

                if (appointmentCustomerPlans.length) {

                  removeMissingFromCache(this.customerPlansService, customerPlans, {key: 'invoiceId', value: invoice.id});

                }

                // Remove cached finance documents that are not part of this invoice
                const removeDocs = customerPlanFinanceDocuments.filter(financeDoc => {
                  return !findById(customerPlans, financeDoc.customerPlanId);
                });

                console.log('Clean up customer plan finance docs', {customerPlanFinanceDocuments, removeDocs})

                if (removeDocs.length) {
                  this.customerPlanFinanceDocumentsService.removeManyFromCache(removeDocs);
                }

                this.dispatchInvoiceLoaded(invoice, appointmentCustomerPlans.length > 0);

                if (planLoads.length) {
                  return forkJoin(planLoads).pipe(first(), map(() => true));
                } else {
                  return of(true);
                }
              }),
              tap(() => {
                // TODO: Remove plans that don't belong to invoice

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

  dispatchInvoiceLoaded(invoice: Invoice, hasPlans: boolean) {
    this.store.dispatch(invoiceLoaded({appointmentId: invoice.appointmentId, invoiceId: invoice.id, hasPlans}));
  }
}
