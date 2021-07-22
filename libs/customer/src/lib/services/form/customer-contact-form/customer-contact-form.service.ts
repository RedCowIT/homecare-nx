import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class CustomerContactFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      id: undefined,
      phone1: [null],
      phone2: [null],
      email1: [null, [Validators.email]],
      email2: [null, [Validators.email]]
    });
  }
}
