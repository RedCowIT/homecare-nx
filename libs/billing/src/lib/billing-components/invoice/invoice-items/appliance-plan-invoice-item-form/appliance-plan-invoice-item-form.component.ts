import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  catchHttpValidationErrors, CustomerPlan,
  CustomerPlanAppliance, InvoiceItem,
  Plan,
  PlanTypes,
  selectFirstEntityByKey, selectOrFetchFirstEntityByKey
} from "@homecare/shared";
import {combineLatest, Observable} from "rxjs";
import {ApplianceRepairPlanService, PlanPaymentPeriodsService, PlansService, PlanTypesService} from "@homecare/plan";
import {CustomerPlanAppliancesService, CustomerPlansService} from "@homecare/customer";
import {InvoiceItemsService} from "../../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {catchError, first, map, mergeAll, mergeMap, takeUntil, tap} from "rxjs/operators";
import {CustomerPlanApplianceInvoiceItemService} from "../../../../services/form/invoice/customer-plan-appliance-invoice-item-form/customer-plan-appliance-invoice-item.service";
import {CustomerPlanInvoiceItemBaseComponent} from "../customer-plan-invoice-item-base/customer-plan-invoice-item-base.component";
import {EntityFormService} from "@homecare/entity";
import {InvoicesService} from "../../../../store/entity/services/invoice/invoices/invoices.service";
import {LoggerService} from "@homecare/core";

@Component({
  selector: 'hc-appliance-plan-invoice-item-form',
  templateUrl: './appliance-plan-invoice-item-form.component.html',
  styleUrls: ['./appliance-plan-invoice-item-form.component.scss'],
  providers: [CustomerPlanApplianceInvoiceItemService]
})
export class AppliancePlanInvoiceItemFormComponent extends CustomerPlanInvoiceItemBaseComponent implements OnInit {

  calculateFill = 'solid';

  @Input()
  invoiceId: number;

  @Input()
  invoiceItemId: number;

  @Input()
  invoiceItemTypeId: number;

  @Input()
  planTypes: number[];

  @Output()
  done = new EventEmitter<void>();

  constructor(public plansService: PlansService,
              public customerPlansService: CustomerPlansService,
              public customerPlanAppliancesService: CustomerPlanAppliancesService,
              public formService: CustomerPlanApplianceInvoiceItemService,
              public planTypesService: PlanTypesService,
              public invoicesService: InvoicesService,
              public invoiceItemsService: InvoiceItemsService,
              public planPaymentPeriodsService: PlanPaymentPeriodsService,
              public applianceRepairPlanService: ApplianceRepairPlanService,
              public logger: LoggerService) {

    super(plansService, customerPlansService, invoicesService, invoiceItemsService);

  }

  ngOnInit(): void {

    super.ngOnInit();

    // TODO: add listener for recalc.
    combineLatest([
      this.formService.form.get('appliancePlan.datePurchased').valueChanges,
      this.formService.form.get('appliancePlan.priceRangeId').valueChanges
    ]).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(([dateChange, priceChange]) => {

      this.formService.form.patchValue({
        'customerPlan': {
          periodPrice: null
        }
      });
    });


  }

  protected initLoading() {
    this.isLoading$ = combineLatest([
      this.customerPlansService.loading$,
      this.customerPlanAppliancesService.loading$,
      this.invoiceItemsService.loading$,
    ])
      .pipe(
        map(([
               plansLoading,
               appliancePlansLoading,
               invoiceItemsLoading
             ]) => plansLoading || appliancePlansLoading || invoiceItemsLoading)
      );
  }


  protected getFormService(): EntityFormService {
    return this.formService;
  }

  protected patchForm() {

    super.patchForm();

    this.planPaymentPeriodsService.selectMonthly().pipe(first()).subscribe(
      planPaymentPeriod => {
        this.getForm().patchValue({
          'customerPlan': {
            planPaymentPeriodId: planPaymentPeriod.id
          }
        });
      });

    this.getApplianceRepairPlan().pipe(first()).subscribe(
      plan => {
        this.getForm().patchValue({
          'invoiceItem': {
            productId: plan.productId
          },
          'customerPlan': {
            planId: plan.id
          }
        });
      }
    )

    this.patchCustomerAppliancePlan();


  }

  calculate() {



    const dto = this.formService.createDTO({groupName: 'appliancePlan'});

    this.applianceRepairPlanService.calculatePeriodPrice(dto).pipe(first()).subscribe(
      result => {
        this.getForm().patchValue({
          'customerPlan': {
            periodPrice: result?.periodPrice
          }
        }, {emitEvent: false});
      }
    );

  }

  getApplianceRepairPlan(): Observable<Plan> {

    return selectFirstEntityByKey(this.planTypesService, 'description', PlanTypes.ApplianceRepairPlan)
      .pipe(mergeMap(planType => {
        return selectFirstEntityByKey(this.plansService, 'planTypeId', planType.id);
      }));

  }

  patchCustomerAppliancePlan() {

    const customerPlanId = this.getForm().value.customerPlan?.id;

    if (customerPlanId) {

      selectOrFetchFirstEntityByKey(this.customerPlanAppliancesService, 'customerPlanId', customerPlanId).pipe(
        first()
      ).subscribe(appliancePlan => {

        if (appliancePlan) {
          this.getForm().patchValue({
            'appliancePlan': appliancePlan
          });
        }

      });

    }

  }

  protected doCreate() {

    this.createInvoiceItem().pipe(
      mergeMap(invoiceItem => {
        return this.createCustomerPlan();
      }),
      mergeMap(customerPlan => {

        this.getForm().patchValue({
          'appliancePlan': {
            'customerPlanId': customerPlan.id
          }
        });

        const dto = this.getFormService().createDTO({groupName: 'appliancePlan'});

        return this.customerPlanAppliancesService.add(dto as CustomerPlanAppliance);

      }),
      catchHttpValidationErrors(errors => {

        this.errors = errors;
      }),
      first()
    ).subscribe((c) => {
      this.done.emit();
    });
  }

  protected doUpdate() {

    const dto = this.getFormService().createDTO() as any;
    this.invoiceItemsService.update(dto.invoiceItem as InvoiceItem).pipe(
      mergeMap(() => {
        return this.customerPlansService.update(dto.customerPlan as CustomerPlan);
      }),
      mergeMap(() => {
        return this.customerPlanAppliancesService.update(dto.appliancePlan as CustomerPlanAppliance);
      }),
      catchHttpValidationErrors(errors => {

        this.errors = errors;
      })
    ).subscribe(() => {
      this.done.emit();
    });

  }
}
