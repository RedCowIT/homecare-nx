import {Component, Input, OnInit} from '@angular/core';
import {InvoiceNotesFormService} from "../../../services/form/invoice/invoice-notes-form/invoice-notes-form.service";
import {EntityContainer, Invoice} from "@homecare/shared";
import {InvoicesService} from "../../../store/entity/services/invoice/invoices/invoices.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'hc-invoice-notes-form',
  templateUrl: './invoice-notes-form.component.html',
  styleUrls: ['./invoice-notes-form.component.scss'],
  providers: [InvoiceNotesFormService]
})
export class InvoiceNotesFormComponent extends EntityContainer<Invoice> implements OnInit {

  @Input()
  id: number;

  constructor(public formService: InvoiceNotesFormService, public entityService: InvoicesService) {
    super(entityService);
  }

  ngOnInit(): void {

    super.ngOnInit();

    console.log('invoice notes form', this.id);

    this.model$.pipe(first()).subscribe(invoice => {
      this.formService.form.patchValue({
        notes: invoice.notes,
        serviceNotes: invoice.serviceNotes
      });
    });
  }

  public validate(): boolean {
    this.formService.form.markAllAsTouched();
    return this.formService.form.valid;
  }

  public getValue() {
    return this.formService.form.value;
  }

}
