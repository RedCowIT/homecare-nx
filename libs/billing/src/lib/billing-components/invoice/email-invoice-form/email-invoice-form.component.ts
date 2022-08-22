import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmailInvoiceFormService} from "../../../services/form/invoice/email-invoice-form/email-invoice-form.service";
import {EntityContainer, Invoice} from "@homecare/shared";
import {InvoicesService} from "../../../store/entity/services/invoice/invoices/invoices.service";
import {CustomersService} from "@homecare/customer";
import {combineLatest, Observable} from "rxjs";
import {first, map} from "rxjs/operators";
import {EmailInvoiceService} from "../../../services/invoice/email-invoice/email-invoice.service";

@Component({
  selector: 'hc-email-invoice-form',
  templateUrl: './email-invoice-form.component.html',
  styleUrls: ['./email-invoice-form.component.scss'],
  providers: [EmailInvoiceFormService]
})
export class EmailInvoiceFormComponent extends EntityContainer<Invoice> implements OnInit {

  @Input()
  id: number;

  @Output()
  done = new EventEmitter<void>();

  emails$: Observable<string[]>;

  disabled = false;

  constructor(public entityService: InvoicesService,
              public formService: EmailInvoiceFormService,
              public emailInvoiceService: EmailInvoiceService,
              public customersService: CustomersService) {
    super(entityService);
  }

  ngOnInit(): void {

    super.ngOnInit();

    this.emails$ = combineLatest([this.model$, this.customersService.entityMap$]).pipe(
      map(([invoice, customerMap]) => {
        const customer = customerMap[invoice.customerId];
        if (!customer) {
          throw new Error('No customer found from invoice with customer id ' + invoice.customerId);
        }
        const emails = [];
        if (customer.email1 && customer.email1 !== '') {
          emails.push(customer.email1);
        }
        if (customer.email2 && customer.email2 !== '') {
          emails.push(customer.email2);
        }
        return emails;
      })
    );

    // Set first email
    this.emails$.pipe(
      first()
    ).subscribe(emails => {
      if (emails?.length) {
        this.formService.form.patchValue({
          toAddress: emails[0]
        });
      } else {
        this.disabled = true;
      }
    });
  }

  sendEmail() {

    const email = this.formService.form.value.toAddress;
    this.emailInvoiceService.send(this.id, email).pipe(
      first()
    ).subscribe(result => {

      this.done.emit();
    });
  }

  skip() {
    this.done.emit();
  }

  sendPost(){
    this.emailInvoiceService.post(this.id).pipe(
      first()
    ).subscribe(result => {
      this.done.emit();
    });
  }
}
