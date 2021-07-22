import { Injectable } from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class VacuumReportFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      id: undefined,
      appointmentId: [null, Validators.required],
      qIndependentCompany: [null, Validators.requiredTrue],
      qServiceCost: [null, Validators.requiredTrue],
      qWashFilters: [null, Validators.required],
      qEfficiency: [null],
      qParts: [null]
    });
  }

}

