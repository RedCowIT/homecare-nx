import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

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

    this.form.setValidators([
      this.numLength('sortCode', 6, 6),
      this.numLength('accountNumber', 8, 8)
    ]);
  }

  public numLength(controlKey: string, min: number, max: number) : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {

      const control = group.controls[controlKey];
      const value = control.value + '';

      if (value.length < min || value.length > max){
        const errors = {};
        errors[controlKey] = true;
        control.setErrors(errors);
      }

      return;
    };
  }
}
