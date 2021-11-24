import {Component} from '@angular/core';
import {PlansService} from "@homecare/plan";
import {CustomerPlansService} from "@homecare/customer";
import {CustomerPlanInvoiceItemService} from "../../../../services/form/invoice/customer-plan-invoice-item-form/customer-plan-invoice-item.service";
import {InvoiceItemsService} from "../../../../store/entity/services/invoice/invoice-items/invoice-items.service";
import {CustomerPlanInvoiceItemBaseComponent} from "../customer-plan-invoice-item-base/customer-plan-invoice-item-base.component";
import {EntityFormService} from "@homecare/entity";

/**
 * TODO: Create CustomerPlanInvoiceItemBaseComponent
 */
@Component({
  selector: 'hc-customer-plan-invoice-item-form',
  templateUrl: './customer-plan-invoice-item-form.component.html',
  styleUrls: ['./customer-plan-invoice-item-form.component.scss'],
  providers: [CustomerPlanInvoiceItemService]
})
export class CustomerPlanInvoiceItemFormComponent extends CustomerPlanInvoiceItemBaseComponent {

  constructor(public plansService: PlansService,
              public customerPlansService: CustomerPlansService,
              public formService: CustomerPlanInvoiceItemService,
              public invoiceItemsService: InvoiceItemsService) {
    super(plansService, customerPlansService, invoiceItemsService);
  }

  protected getFormService(): EntityFormService {
    return this.formService;
  }
}
