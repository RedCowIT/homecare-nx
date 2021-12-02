import {Injectable} from "@angular/core";

import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class AppointmentVisitCompleteFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      id: undefined,
      customerComments: [null],
      engineerRating: [null, Validators.required]
    });
  }

}
