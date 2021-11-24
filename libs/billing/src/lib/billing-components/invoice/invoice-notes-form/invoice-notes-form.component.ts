import {Component, OnInit} from '@angular/core';
import {InvoiceNotesFormService} from "../../../services/form/invoice/invoice-notes-form/invoice-notes-form.service";
import {EntityContainer, Invoice} from "@homecare/shared";
import {InvoicesService} from "../../../store/entity/services/invoice/invoices/invoices.service";

@Component({
  selector: 'hc-invoice-notes-form',
  templateUrl: './invoice-notes-form.component.html',
  styleUrls: ['./invoice-notes-form.component.scss'],
  providers: [InvoiceNotesFormService]
})
export class InvoiceNotesFormComponent extends EntityContainer<Invoice> implements OnInit {

  constructor(public formService: InvoiceNotesFormService, public entityService: InvoicesService) {
    super(entityService);
  }

  ngOnInit(): void {

  }

}
