import { Component, OnInit } from '@angular/core';
import {CustomerPlanInvoiceItemBaseComponent} from "../customer-plan-invoice-item-base/customer-plan-invoice-item-base.component";
import {ApplianceRepairPlanService, PlanPaymentPeriodsService, PlansService, PlanTypesService} from "@homecare/plan";
import {CustomerPlanAppliancesService, CustomerPlansService} from "@homecare/customer";
import {CustomerPlanApplianceInvoiceItemService} from "../../../../services/form/invoice/customer-plan-appliance-invoice-item-form/customer-plan-appliance-invoice-item.service";
import {InvoiceItemsService} from "../../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {CustomerPlanFinanceService} from "../../../../../../../customer/src/lib/store/entity/services/customer-plan-finance/customer-plan-appliances.service";
import {CustomerPlanFinanceInvoiceItemFormService} from "../../../../services/form/invoice/customer-plan-finance-invoice-item-form/customer-plan-finance-invoice-item.service";

@Component({
  selector: 'hc-finance-plan-invoice-item-form',
  templateUrl: './finance-plan-invoice-item-form.component.html',
  styleUrls: ['./finance-plan-invoice-item-form.component.scss']
})
export class FinancePlanInvoiceItemFormComponent extends CustomerPlanInvoiceItemBaseComponent implements OnInit {

  calculateFill = 'solid';

  constructor(public plansService: PlansService,
              public customerPlansService: CustomerPlansService,
              public customerPlanAppliancesService: CustomerPlanAppliancesService,
              public formService: CustomerPlanFinanceInvoiceItemFormService,
              public planTypesService: PlanTypesService,
              public invoiceItemsService: InvoiceItemsService,
              public planPaymentPeriodsService: PlanPaymentPeriodsService,
              public financePlanService: CustomerPlanFinanceService) {

    super(plansService, customerPlansService, invoiceItemsService);

  }

  ngOnInit(): void {

    super.ngOnInit();

  }

}
