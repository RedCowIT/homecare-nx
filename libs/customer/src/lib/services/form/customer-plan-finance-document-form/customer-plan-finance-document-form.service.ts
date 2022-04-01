import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class CustomerPlanFinanceDocumentFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      id: undefined,
      phone1: [null],
      phone2: [null],
      email1: [null, [Validators.email]],
      email2: [null, [Validators.email]],
      title: [null],
      customerName: [null],
      dob: [null],
      residentialStatus: [null, Validators.required],
      currentAddressLessThanThree: [null],
      currentAddress1: [null, Validators.required],
      currentAddress2: [null],
      currentAddress3: [null],
      currentAddress4: [null],
      currentPostcode: [null, Validators.required],
      previousAddress1: [null],
      previousAddress2: [null],
      previousAddress3: [null],
      previousAddress4: [null],
      previousPostcode: [null],
      employmentStatusId: [null, Validators.required],
      employmentStatusTimeId: [null, Validators.required],
      occupation: [null],
      signatureName: [null, Validators.required],
      signatureDate: [null, Validators.required],
      signatureBase64: [null]
    });
  }
}


