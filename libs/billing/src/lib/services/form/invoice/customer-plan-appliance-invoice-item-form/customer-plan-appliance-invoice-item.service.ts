import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";
import {nowAsDateString} from "../../../../../../../shared/src/lib/utils/date-utils";
import {ApplianceTypesService} from "@homecare/product";
import {combineLatest} from "rxjs";

@Injectable()
export class CustomerPlanApplianceInvoiceItemService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      invoiceItem: this.fb.group({
        id: undefined,
        invoiceId: [null, Validators.required],
        invoiceItemTypeId: [null, Validators.required],
        productId: [null, Validators.required],
        qty: [1, Validators.required],
        unitPrice: [null]
      }),
      customerPlan: this.fb.group({
        id: undefined,
        customerId: [null],
        appointmentId: [null],
        planId: [null, Validators.required],
        invoiceId: [null, Validators.required],
        invoiceItemId: [null],
        startDate: [nowAsDateString(), Validators.required],
        periodPrice: [null, Validators.required],
        planPaymentPeriodId: [null, Validators.required],
        upgrade: [null],
        notes: [null]
      }),
      appliancePlan: this.fb.group({
        id: undefined,
        customerPlanId: [null],
        applianceTypeId: [null, Validators.required],
        brandId: [null, Validators.required],
        model: [null, Validators.required],
        serialNo: [null],
        datePurchased: [null, Validators.required],
        priceRangeId: [null, Validators.required],
        installTypeId: [null, Validators.required],
        fuelTypeId: [null],
        tumbleDryerTypeId: [null]
      })
    });

  }

}
