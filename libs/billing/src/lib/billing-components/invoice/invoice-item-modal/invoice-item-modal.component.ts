import {Component, Input, OnInit} from '@angular/core';
import {
  firstByKey, firstItem,
  InvoiceItem,
  invoiceItemMeta,
  InvoiceItemType,
  InvoiceItemTypes,
  PlanTypes,
  ProductCategories,
  ProductCategory,
  selectEntity, selectEntityByKey,
  selectFirstEntityByKey,
  selectOrFetchEntity,
  selectOrFetchFirstEntityByKey,
  servicePlanTypes
} from "@homecare/shared";
import {InvoiceItemTypesService} from "../../../store/entity/services/invoice/invoice-item-types/invoice-item-types.service";
import {Observable, of} from "rxjs";
import {ProductCategoriesService, ProductsService} from "@homecare/product";
import {ModalController} from "@ionic/angular";
import {PlansService, PlanTypesService} from "@homecare/plan";
import {catchError, first, map, mergeMap} from "rxjs/operators";
import {InvoiceItemsService} from "../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {CustomerPlansService} from "@homecare/customer";
import {toTitleCase} from "@homecare/common";
import {InvoicesService} from "../../../store/entity/services/invoice/invoices/invoices.service";

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

    console.log('initFromType', this.type);

    this.title = toTitleCase(this.type);

    this.invoiceItemType$ = this.invoiceItemTypesService.selectByDescription(invoiceItemMeta[this.type].description);

  }

  initFromInvoiceItem() {

    console.log('initFromInvoiceItem', {
      invoiceId: this.invoiceId,
      invoiceItemId: this.invoiceItemId
    });

    // Get type from invoice item
    // Invoice Item > Product > Product Category
    // If Product Category === Service, then
    selectEntity(this.invoiceItemsService, this.invoiceItemId).pipe(
      mergeMap(invoiceItem => selectEntity(this.productsService, invoiceItem.productId)),
      mergeMap(product => {
        console.log('Opening modal with product', product);
        return selectEntity(this.productCategoriesService, product.categoryId);
      }),
      mergeMap(productCategory => {

        console.log('product category', productCategory);

        if (productCategory.description === ProductCategories.Service) {
          return of(InvoiceItemTypes.Service)
        }

        if (productCategory.description === ProductCategories.Plan) {

          return selectEntity(this.invoicesService, this.invoiceId).pipe(
            first(),
            mergeMap(invoice => {

              console.log('Selecting customer plan for invoice item', this.invoiceItemId);

              return selectEntityByKey(this.customerPlansService, 'customerId', invoice.customerId).pipe(
                map(customerPlans => firstByKey(customerPlans, 'invoiceItemId', this.invoiceItemId))
              );

            }),
            mergeMap(customerPlan => {

              console.log('customerPlan', customerPlan);

              return selectEntity(this.plansService, customerPlan.planId);

            }),
            mergeMap(plan => {
              return selectEntity(this.planTypesService, plan.planTypeId)
            }),
            map(planType => {

              console.log('Opening InvoiceItemModal with planType', planType);

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

        return of(InvoiceItemTypes.Misc);

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
    await this.modalCtrl.dismiss();
  }

}
