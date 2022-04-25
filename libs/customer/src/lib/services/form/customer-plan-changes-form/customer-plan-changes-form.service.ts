import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerPlanChange} from "@homecare/shared";

@Injectable()
export class CustomerPlanChangesFormService {

  form: FormGroup;

  constructor(protected fb: FormBuilder) {

  }

  get customerPlanChanges(): FormArray {
    return this.form.get("customerPlanChanges") as FormArray
  }

  public init(customerPlanChanges: CustomerPlanChange[]): void {
    this.form = this.fb.group({
      customerPlanChanges: this.fb.array([])
    });

    const planChanges = this.customerPlanChanges;

    for (const customerPlanChange of customerPlanChanges) {
      planChanges.push(this.newPlanChange(customerPlanChange));
    }
  }

  protected newPlanChange(customerPlanChange: CustomerPlanChange): FormGroup {
    return this.fb.group({
      customerPlanId: [customerPlanChange.customerPlanId, [Validators.required]],
      appointmentId: [customerPlanChange.appointmentId, [Validators.required]],
      startDate: [customerPlanChange.startDate, [Validators.required]],
      canIncrease: [customerPlanChange.canIncrease, [Validators.required]],
      periodPrice: [customerPlanChange.periodPrice, [Validators.required]],
      newPrice: [customerPlanChange.newPrice, [Validators.required]],
      description: [customerPlanChange.description, []]
    });
  }
}
