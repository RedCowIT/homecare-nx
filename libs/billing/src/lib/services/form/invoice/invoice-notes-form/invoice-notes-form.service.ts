import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class InvoiceNotesFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      id: undefined,
      appointmentId: [null, Validators.required],
      notes: [null, Validators.required],
      serviceNotes: [null, Validators.required]
    });
  }
}
