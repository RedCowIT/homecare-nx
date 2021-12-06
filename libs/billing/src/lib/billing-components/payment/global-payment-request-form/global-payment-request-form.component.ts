import {Component, Input, OnInit} from '@angular/core';
import {GlobalPaymentRequestFormService} from "../../../services/form/payment/global-payment-request-form/global-payment-request-form.service";
import {
  Customer,
  CustomerAddress, findByKey,
  firstByKey,
  getCustomerEmail,
  getCustomerPhone,
  Invoice,
  selectEntity, SubscribedContainer
} from "@homecare/shared";
import {GlobalPaymentsService} from "../../../services/payment/global-payments/global-payments.service";
import {InvoicesService} from "../../../store/entity/services/invoice/invoices/invoices.service";
import {combineLatest, Observable} from "rxjs";
import {CustomerAddressesService, CustomersService} from "@homecare/customer";
import {first, mergeMap, takeUntil} from "rxjs/operators";
import {Validators} from "@angular/forms";

@Component({
  selector: 'hc-global-payment-request-form',
  templateUrl: './global-payment-request-form.component.html',
  styleUrls: ['./global-payment-request-form.component.scss'],
  providers: [GlobalPaymentRequestFormService]
})
export class GlobalPaymentRequestFormComponent extends SubscribedContainer implements OnInit {

  @Input()
  invoiceId: number;

  invoice$: Observable<Invoice>;

  customer$: Observable<Customer>;

  checkoutEnabled = false;

  constructor(public formService: GlobalPaymentRequestFormService,
              public globalPaymentsService: GlobalPaymentsService,
              public invoicesService: InvoicesService,
              public customersService: CustomersService,
              public customerAddressesService: CustomerAddressesService) {
    super();
  }

  ngOnInit(): void {

    this.invoice$ = selectEntity(this.invoicesService, this.invoiceId);

    this.customer$ = this.invoice$.pipe(
      mergeMap(invoice => selectEntity(this.customersService, invoice.customerId))
    );

    combineLatest([this.invoice$, this.customer$, this.customerAddressesService.entities$]).pipe(
      first()
    ).subscribe(([invoice, customer, customerAddresses]) => {

      const patch: any = {
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        email: getCustomerEmail(customer),
        phone: getCustomerPhone(customer),
        amount: 0
      };

      const customerAddress = this.customerAddressesService.getDefaultCustomerAddress(customerAddresses, customer.id);

      if (customerAddress) {
        patch['customerAddress1'] = customerAddress.address1;
        patch['city'] = customerAddress.address2;
        patch['postcode'] = customerAddress.postcode;
      }

      this.formService.form.patchValue(patch);

    });

    this.formService.form.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(formValue => {
      console.log('Form value changes', formValue);
      this.syncBillingAddress(formValue);
    });

  }


  syncBillingAddress(formValue: any) {

    if (formValue.addressSyncBilling) {
      this.formService.form.patchValue({
        billingAddress1: formValue.customerAddress1,
        billingAddress2: formValue.customerAddress2,
        billingAddress3: formValue.customerAddress3,
        billingCity: formValue.customerCity,
        billingPostcode: formValue.customerPostcode
      }, {
        emitEvent: false
      });
    } else {
      this.formService.form.patchValue({
        billingAddress1: '',
        billingAddress2: '',
        billingAddress3: '',
        billingCity: '',
        billingPostcode: ''
      }, {
        emitEvent: false
      });
    }
  }
}
