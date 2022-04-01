import { Injectable } from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class OvenReportFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      id: [null, Validators.required],
      ovenComments: [null, Validators.required]
    });
  }

}
