import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";
import {nowAsDateString} from "../../../../../../../shared/src/lib/utils/date-utils";

@Injectable()
export class CustomerPlanInvoiceItemService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      invoiceItem: this.fb.group({
        id: undefined,
        invoiceItemTypeId: [null, Validators.required],
        invoiceId: [null, Validators.required],
        productId: [null, Validators.required],
        qty: [null, Validators.required],
        unitPrice: [null]
      }),
      customerPlan: this.fb.group({
        id: undefined,
        customerId: [null],
        planId: [null, Validators.required],
        invoiceId: [null, Validators.required],
        appointmentId: [null, Validators.required],
        invoiceItemId: [null],
        startDate: [nowAsDateString(), Validators.required],
        periodPrice: [null, Validators.required],
        planPaymentPeriodId: [null, Validators.required],
        upgrade: [null],
        notes: [null]
      })
    });
  }

}
