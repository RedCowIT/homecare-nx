import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class QuoteApplianceDetailFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      'appliance': this.fb.group({
        id: undefined,
        quoteItemId: undefined,
        applianceTypeId: [null, Validators.required],
        brandId: [null, Validators.required],
        model: [null, Validators.required],
        serialNo: [null],
        priceRangeId: [null, Validators.required],
        datePurchase: [null, Validators.required]
      })
    });
  }
}
