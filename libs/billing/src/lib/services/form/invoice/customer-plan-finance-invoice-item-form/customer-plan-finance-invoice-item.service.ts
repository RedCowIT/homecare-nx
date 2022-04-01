import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {nowAsDateString} from "@homecare/shared";

@Injectable()
export class CustomerPlanFinanceInvoiceItemFormService extends EntityFormService {

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
        planId: [null, Validators.required],
        invoiceId: [null, Validators.required],
        appointmentId: [null, Validators.required],
        invoiceItemId: [null],
        startDate: [nowAsDateString(), Validators.required],
        periodPrice: [null, Validators.required],
        planPaymentPeriodId: [null, Validators.required],
        upgrade: [null],
        notes: [null]
      }),
      financePlan: this.fb.group({
          id: undefined,
          customerPlanId: [null],
          productId: [null, Validators.required],
          price: [null, Validators.required],
          deposit: [null, Validators.required],
          monthPeriodId: [null, Validators.required],
          loan: [null],
          interest: [null],
          totalPayable: [null],
          monthlyPayment: [null]
        },
        {
          validators: [this.depositLessThanPriceValidator]
        })
    });
  }

  depositLessThanPriceValidator(formGroup: FormGroup) {
    console.log('depositLessThanPriceValidator');

    if (formGroup.value.price) {
      if (!formGroup.value.deposit || formGroup.value.deposit > formGroup.value.price) {
        return {
          depositGreaterThanPrice: true,
        };
      }
    }
    return null;
  }
}
