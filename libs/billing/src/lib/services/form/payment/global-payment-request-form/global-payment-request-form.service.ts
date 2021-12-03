import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class GlobalPaymentRequestFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      invoiceId: [null, Validators.required],
      invoiceNumber: [null, Validators.required],
      description: [null, Validators.required],
      amount: [null, [Validators.min(0.01)]],
      email: [null, Validators.required],
      phone: [null],
      customerAddress1: [null, Validators.required],
      customerAddress2: [null],
      customerAddress3: [null],
      customerCity: [null, Validators.required],
      customerPostcode: [null, Validators.required],
      billingAddress1: [null, Validators.required],
      billingAddress2: [null],
      billingAddress3: [null],
      billingCity: [null, Validators.required],
      billingPostcode: [null, Validators.required],
      addressSyncBilling: false
    });
  }
}
