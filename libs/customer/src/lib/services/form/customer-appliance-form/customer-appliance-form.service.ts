import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class CustomerApplianceFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      'appliance': this.fb.group({
        id: undefined,
        customerId: [null, Validators.required],
        applianceTypeId: [null, Validators.required],
        manufacturerId: [null],
        modelId: [null],
        manufacturerText: [null],
        modelText: [null],
        serialNo: [null]
      })
    });
  }

}
