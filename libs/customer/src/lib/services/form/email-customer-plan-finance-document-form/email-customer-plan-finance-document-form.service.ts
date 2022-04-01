
import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class EmailCustomerPlanFinanceDocumentFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      toAddress: [null, Validators.required]
    });
  }

}
