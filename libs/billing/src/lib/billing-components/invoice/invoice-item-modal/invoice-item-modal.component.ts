import {Component, Input, OnInit} from '@angular/core';
import {
  firstByKey,
  InvoiceItem,
  invoiceItemMeta,
  InvoiceItemType,
  InvoiceItemTypes, PlanTypes,
  ProductCategories,
  ProductCategory, selectEntity, selectFirstEntityByKey, servicePlanTypes
} from "@homecare/shared";
import {InvoiceItemTypesService} from "../../../store/entity/services/invoice/invoice-item-types/invoice-item-types.service";
import {Observable, of} from "rxjs";
import {ProductCategoriesService, ProductsService} from "@homecare/product";
import {ModalController} from "@ionic/angular";
import {PlansService, PlanTypesService} from "@homecare/plan";
import {first, map, mergeMap} from "rxjs/operators";
import {InvoiceItemsService} from "../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {CustomerPlansService} from "@homecare/customer";
import {toTitleCase} from "@homecare/common";

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
      mergeMap(invoiceItem => this.productsService.getByKey(invoiceItem.productId)),
      mergeMap(product => {
        console.log('Product', product);
        return selectEntity(this.productCategoriesService, product.categoryId);
      }),
      mergeMap(productCategory => {

        console.log('product category', productCategory);

        if (productCategory.description === ProductCategories.Service) {
          return of(InvoiceItemTypes.Service)
        }

        if (productCategory.description === ProductCategories.Plan) {

          return this.customerPlansService.getAll().pipe(
            mergeMap(customerPlans => {
              const customerPlan = firstByKey(customerPlans, 'invoiceItemId', this.invoiceItemId);
              return selectEntity(this.plansService, customerPlan.planId);
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
            })
          )

        }

        return of(InvoiceItemTypes.Misc);


      }),
      first()
    ).subscribe(type => {
      console.log('initFromInvoiceItem() use type', type);
      this.type = type;
      this.initFromType();
    })
  }

  async close() {
    await this.modalCtrl.dismiss();
  }
}
