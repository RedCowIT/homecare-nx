import {Component, Input, OnInit} from '@angular/core';
import {
  firstByKey, firstItem,
  InvoiceItem,
  invoiceItemMeta,
  InvoiceItemType,
  InvoiceItemTypes,
  PlanTypes,
  ProductCategories,
  ProductCategory, ProductCategoryCodes,
  selectEntity, selectEntityByKey,
  selectFirstEntityByKey,
  selectOrFetchEntity,
  selectOrFetchFirstEntityByKey,
  servicePlanTypes
} from "@homecare/shared";
import {InvoiceItemTypesService} from "../../../store/entity/services/invoice/invoice-item-types/invoice-item-types.service";
import {EMPTY, forkJoin, Observable, of} from "rxjs";
import {ProductCategoriesService, ProductsService} from "@homecare/product";
import {ModalController} from "@ionic/angular";
import {PlansService, PlanTypesService} from "@homecare/plan";
import {catchError, first, map, mergeMap, switchMap} from "rxjs/operators";
import {InvoiceItemsService} from "../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {CustomerPlansService} from "@homecare/customer";
import {BooleanValue, toTitleCase} from "@homecare/common";
import {InvoicesService} from "../../../store/entity/services/invoice/invoices/invoices.service";
import {InvoiceManagerService} from "../../../services/invoice/invoice-manager/invoice-manager.service";

@Component({
  selector: 'hc-invoice-item-modal',
  templateUrl: './invoice-item-modal.component.html',
  styleUrls: ['./invoice-item-modal.component.scss']
})
export class InvoiceItemModalComponent implements OnInit {

  @Input()
  invoiceId: number;

  @Input()
  type: string;

  @Input()
  invoiceItemId: number;

  title: string;


  invoiceItemType$: Observable<InvoiceItemType>;

  serviceProductCategory$: Observable<ProductCategory>;

  servicePlanTypes$: Observable<number[]>;

  constructor(public invoiceItemTypesService: InvoiceItemTypesService,
              public invoiceItemsService: InvoiceItemsService,
              public productsService: ProductsService,
              public productCategoriesService: ProductCategoriesService,
              public planTypesService: PlanTypesService,
              public plansService: PlansService,
              public customerPlansService: CustomerPlansService,
              public invoicesService: InvoicesService,
              public invoiceManagerService: InvoiceManagerService,
              public modalCtrl: ModalController) {

    this.serviceProductCategory$ = this.productCategoriesService.selectByDescription(ProductCategories.Service);

    this.servicePlanTypes$ = this.planTypesService.entities$.pipe(
      map(planTypes => {

        return planTypes.filter(planType => {
          return servicePlanTypes.includes(planType.description);
        }).map(planType => planType.id);

      })
    );
  }

  ngOnInit(): void {

    if (this.type) {
      this.initFromType();
      return;
    }

    this.initFromInvoiceItem();

  }

  initFromType() {

    this.title = toTitleCase(this.type);

    this.invoiceItemType$ = this.invoiceItemTypesService.selectByDescription(invoiceItemMeta[this.type].description);

  }

  initFromInvoiceItem() {

    // Get type from invoice item
    // Invoice Item > Product > Product Category
    // If Product Category === Service, then
    selectEntity(this.invoiceItemsService, this.invoiceItemId).pipe(
      mergeMap(invoiceItem => selectEntity(this.productsService, invoiceItem.productId)),
      mergeMap(product => {
        return selectEntity(this.productCategoriesService, product.categoryId);
      }),
      mergeMap(productCategory => {

        if (productCategory.description === ProductCategories.Service) {
          return of(InvoiceItemTypes.Service)
        }

        if (productCategory.description === ProductCategories.Plan) {

          return selectEntity(this.invoicesService, this.invoiceId).pipe(
            first(),
            mergeMap(invoice => {

              return forkJoin([
                of(invoice),
                selectEntityByKey(this.customerPlansService, 'customerId', invoice.customerId).pipe(first())
              ]);

            }),
            mergeMap(([invoice, customerPlans]) => {

              const customerPlan = firstByKey(customerPlans, 'invoiceItemId', this.invoiceItemId);

              if (!customerPlan){
                return this.customerPlansService.getWithQuery({customerId: `${invoice.customerId}`}).pipe(
                  mergeMap(customerPlans => of(firstByKey(customerPlans, 'invoiceItemId', this.invoiceItemId))),
                  mergeMap(foundCustomerPlan => selectEntity(this.plansService, foundCustomerPlan.planId))
                );
              } else {
                return selectEntity(this.plansService, customerPlan.planId);
              }

            }),
            mergeMap(plan => {
              return selectEntity(this.planTypesService, plan.planTypeId)
            }),
            map(planType => {

              switch (planType.description) {
                case PlanTypes.ApplianceRepairPlan:
                  return InvoiceItemTypes.RepairPlan;
                case PlanTypes.Finance:
                  return InvoiceItemTypes.FinancePlan;
                default:
                  return InvoiceItemTypes.ServicePlan;
              }
            }));
        }

        if (productCategory.code === ProductCategoryCodes.Misc){
          return of(InvoiceItemTypes.Misc);
        }

        return of(InvoiceItemTypes.Other);

      }),
      catchError(error => {

          console.error('Failed to load invoice modal', error);
          return of(null);
        }
      ),
      first()
    ).subscribe(type => {
      this.type = type;
      this.initFromType();
    })
  }

  async close() {

    console.log('invoiceItemModal.close');

    selectEntity(this.invoicesService, this.invoiceId).pipe(first()).subscribe(invoice => {
      if (invoice){
        this.invoiceManagerService.loadAppointmentInvoice(invoice.appointmentId).pipe(first()).subscribe();
      }
    });

    await this.modalCtrl.dismiss();
  }

}
