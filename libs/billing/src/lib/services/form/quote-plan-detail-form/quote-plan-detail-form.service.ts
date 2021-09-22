import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class QuotePlanDetailFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      id: undefined,
      quoteItemId: undefined,
      planTypeId: [null, Validators.required],
      planId: [null, Validators.required],
      startDate: [null, Validators.required],
      periodPrice: [null, Validators.required],
      planPaymentPeriodId: [null, Validators.required]
    });
  }
}
