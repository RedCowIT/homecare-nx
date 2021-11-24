import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {FormBuilder, Validators} from "@angular/forms";

@Injectable()
export class ProductInvoiceItemFormService extends EntityFormService {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      id: undefined,
      invoiceId: [null, Validators.required],
      productId: [null, Validators.required],
      qty: [null, Validators.required],
      unitPrice: [null, Validators.required],
      invoiceItemTypeId: [null, Validators.required]
    });
  }

}
