import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class DirectDebitDetailsFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      id: undefined,
      appointmentId: [null, [Validators.required]],
      accountHolder: [null, [Validators.required]],
      sortCode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      accountNumber: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    });
  }
}
