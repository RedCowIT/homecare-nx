import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerPlanFinanceDocument, EntityContainer} from "@homecare/shared";
import {Observable} from "rxjs";
import {CustomersService} from "../../../store/entity/services/customers/customers.service";
import {first, map} from "rxjs/operators";
import {CustomerPlanFinanceDocumentsService} from "../../../store/entity/services/customer-plan-finance-documents/customer-plan-finance-documents.service";
import {EmailCustomerPlanFinanceDocumentFormService} from "../../../services/form/email-customer-plan-finance-document-form/email-customer-plan-finance-document-form.service";
import {EmailCustomerPlanFinanceDocumentService} from "../../../services/email-customer-plan-finance-document/email-customer-plan-finance-document.service";

@Component({
  selector: 'hc-email-customer-plan-finance-document-form',
  templateUrl: './email-customer-plan-finance-document-form.component.html',
  styleUrls: ['./email-customer-plan-finance-document-form.component.scss'],
  providers: [EmailCustomerPlanFinanceDocumentFormService]
})
export class EmailCustomerPlanFinanceDocumentFormComponent extends EntityContainer<CustomerPlanFinanceDocument> implements OnInit {

  @Input()
  id: number;

  @Output()
  done = new EventEmitter<void>();

  emails$: Observable<string[]>;

  disabled = false;

  constructor(public entityService: CustomerPlanFinanceDocumentsService,
              public formService: EmailCustomerPlanFinanceDocumentFormService,
              public emailCustomerPlanFinanceDocumentService: EmailCustomerPlanFinanceDocumentService,
              public customersService: CustomersService) {
    super(entityService);
  }

  ngOnInit(): void {

    super.ngOnInit();

    this.emails$ = this.model$.pipe(
      map(customerPlanFinanceDocument => {

        const emails = [];
        if (customerPlanFinanceDocument.email1 && customerPlanFinanceDocument.email1 !== '') {
          emails.push(customerPlanFinanceDocument.email1);
        }
        if (customerPlanFinanceDocument.email2 && customerPlanFinanceDocument.email2 !== '') {
          emails.push(customerPlanFinanceDocument.email2);
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
    this.emailCustomerPlanFinanceDocumentService.send(this.id, email).pipe(
      first()
    ).subscribe(result => {

      this.done.emit();
    });
  }

  skip() {
    this.done.emit();
  }
}
