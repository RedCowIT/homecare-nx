import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerPlanInvoiceItemBaseComponent} from "../customer-plan-invoice-item-base/customer-plan-invoice-item-base.component";
import {ApplianceRepairPlanService, PlanPaymentPeriodsService, PlansService, PlanTypesService} from "@homecare/plan";
import {CustomerPlanAppliancesService, CustomerPlansService} from "@homecare/customer";
import {CustomerPlanApplianceInvoiceItemService} from "../../../../services/form/invoice/customer-plan-appliance-invoice-item-form/customer-plan-appliance-invoice-item.service";
import {InvoiceItemsService} from "../../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {CustomerPlanFinanceInvoiceItemFormService} from "../../../../services/form/invoice/customer-plan-finance-invoice-item-form/customer-plan-finance-invoice-item.service";
import {InvoicesService} from "../../../../store/entity/services/invoice/invoices/invoices.service";
import {EntityFormService} from "@homecare/entity";
import {first, mergeMap, tap} from "rxjs/operators";
import {FinancePlanService} from "../../../../../../../plan/src/lib/services/finance/finance-plan/finance-plan.service";
import {EMPTY, Observable} from "rxjs";
import {
  catchHttpValidationErrors, CustomerPlan,
  CustomerPlanAppliance, CustomerPlanFinance, InvoiceItem, parseApiValidationErrors,
  Plan,
  PlanTypes,
  selectFirstEntityByKey,
  selectOrFetchFirstEntityByKey
} from "@homecare/shared";
import {CustomerPlanFinanceService} from "../../../../../../../customer/src/lib/store/entity/services/customer-plan-finance/customer-plan-finance.service";
import {CustomerPlanFinanceDocumentsService} from "../../../../../../../customer/src/lib/store/entity/services/customer-plan-finance-documents/customer-plan-finance-documents.service";

@Component({
  selector: 'hc-finance-plan-invoice-item-form',
  templateUrl: './finance-plan-invoice-item-form.component.html',
  styleUrls: ['./finance-plan-invoice-item-form.component.scss'],
  providers: [CustomerPlanFinanceInvoiceItemFormService]
})
export class FinancePlanInvoiceItemFormComponent extends CustomerPlanInvoiceItemBaseComponent implements OnInit {

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

  calculateFill = 'solid';

  constructor(public plansService: PlansService,
              public customerPlansService: CustomerPlansService,
              public customerPlanAppliancesService: CustomerPlanAppliancesService,
              public formService: CustomerPlanFinanceInvoiceItemFormService,
              public planTypesService: PlanTypesService,
              public invoiceItemsService: InvoiceItemsService,
              public planPaymentPeriodsService: PlanPaymentPeriodsService,
              public invoicesService: InvoicesService,
              public customerPlanFinanceService: CustomerPlanFinanceService,
              public customerPlanFinanceDocumentsService: CustomerPlanFinanceDocumentsService,
              public financePlanService: FinancePlanService) {

    super(plansService, customerPlansService, invoicesService, invoiceItemsService);

  }

  ngOnInit(): void {

    super.ngOnInit();

    // select monthly
    this.planPaymentPeriodsService.selectMonthly().pipe(
      first()
    ).subscribe(planPaymentPeriod => {
      this.getForm().patchValue({
        'customerPlan': {
          planPaymentPeriodId: planPaymentPeriod.id
        }
      });
    });

    this.getFinancePlan().pipe(first()).subscribe(
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

    this.patchCustomerFinancePlan();
  }

  protected getFormService(): EntityFormService {
    return this.formService;
  }

  calculate() {

    const dto = this.formService.createDTO({groupName: 'financePlan'});

    this.financePlanService.calculate(dto).pipe(first()).subscribe(
      result => {

        this.getForm().patchValue({
          'financePlan': {
            loan: result?.loan,
            interest: result?.interest,
            totalPayable: result?.totalPayable,
            monthlyPayment: result?.monthlyPayment
          }
        });

        this.getForm().patchValue({
          'customerPlan': {
            periodPrice: result?.monthlyPayment
          }
        });
      }
    )

  }

  getFinancePlan(): Observable<Plan> {

    return selectFirstEntityByKey(this.planTypesService, 'description', PlanTypes.Finance)
      .pipe(mergeMap(planType => {
        return selectFirstEntityByKey(this.plansService, 'planTypeId', planType.id);
      }));

  }

  patchCustomerFinancePlan() {

    const customerPlanId = this.getForm().value.customerPlan?.id;

    if (customerPlanId) {

      selectOrFetchFirstEntityByKey(this.customerPlanFinanceService, 'customerPlanId', customerPlanId).pipe(
        first()
      ).subscribe(financePlan => {

        if (financePlan) {

          this.formService.editMode = true;

          this.getForm().patchValue({
            'financePlan': financePlan
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
          'financePlan': {
            'customerPlanId': customerPlan.id
          }
        });

        const dto = this.getFormService().createDTO({groupName: 'financePlan'});

        return this.customerPlanFinanceService.add(dto as CustomerPlanFinance);

      }),
      mergeMap(customerPlanFinance => {
        return this.customerPlanFinanceDocumentsService.getWithQuery({
          customerPlanId: `${customerPlanFinance.customerPlanId}`
        });
      }),
      catchHttpValidationErrors(errors => {

        this.errors = parseApiValidationErrors(errors);
        return EMPTY;

      }),
      first()
    ).subscribe((c) => {

      // TODO: load finance docs

      this.done.emit();
    });
  }

  doUpdate() {

    const dto = this.getFormService().createDTO() as any;
    this.invoiceItemsService.update(dto.invoiceItem as InvoiceItem).pipe(
      mergeMap(() => {
        return this.customerPlansService.update(dto.customerPlan as CustomerPlan);
      }),
      mergeMap(() => {
        return this.customerPlanFinanceService.update(dto.financePlan as CustomerPlanFinance);
      }),
      catchHttpValidationErrors(errors => {
        this.errors = parseApiValidationErrors(errors);
        return EMPTY;
      })
    ).subscribe(() => {
      this.done.emit();
    });

  }

}
