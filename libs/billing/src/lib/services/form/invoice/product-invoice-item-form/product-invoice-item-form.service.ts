import {Injectable} from '@angular/core';
import {EntityFormService} from "@homecare/entity";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Injectable()
export class ProductInvoiceItemFormService extends EntityFormService {

  stockQty: number = null;

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected init(): void {
    this.form = this.fb.group({
      id: undefined,
      invoiceId: [null, Validators.required],
      productId: [null, Validators.required],
      qty: [null, [Validators.required, Validators.min(1)]],
      unitPrice: [null, Validators.required],
      invoiceItemTypeId: [null, Validators.required]
    });
  }

  setStockQuantity(stockQty: number){
    this.stockQty = stockQty;
    if (stockQty === undefined || stockQty === null){
      this.form.setValidators(null);
    } else {
      this.form.setValidators(this.quantityValidator(this.stockQty));
    }
  }

  public quantityValidator(maxQuantity: number) : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {

      const qty = group.controls['qty'];
      if (qty.value > maxQuantity){
        qty.setErrors({maxQuantity: true});
      }
      return;
    };
  }
}
