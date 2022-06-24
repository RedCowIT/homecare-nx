import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalPaymentRequestFormService} from "../../../services/form/payment/global-payment-request-form/global-payment-request-form.service";
import {
  Customer,
  getCustomerEmail,
  GlobalPaymentRequest,
  GlobalPaymentResult,
  Invoice,
  selectEntity,
  SubscribedContainer
} from "@homecare/shared";
import {InvoicesService} from "../../../store/entity/services/invoice/invoices/invoices.service";
import {combineLatest, Observable} from "rxjs";
import {CustomerAddressesService, CustomersService} from "@homecare/customer";
import {first, map, mergeMap, takeUntil} from "rxjs/operators";
import {ModalController} from "@ionic/angular";
import {CardPaymentsService} from "../../../store/entity/services/card-payment/card-payments.service";

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

  phones$: Observable<string[]>;

  globalPaymentRequest: GlobalPaymentRequest;

  checkoutEnabled = false;

  errors: string;

  constructor(public formService: GlobalPaymentRequestFormService,
              public invoicesService: InvoicesService,
              public customersService: CustomersService,
              public customerAddressesService: CustomerAddressesService,
              public cardPaymentsService: CardPaymentsService,
              public modalCtrl: ModalController) {
    super();
  }

  ngOnInit(): void {

    this.invoice$ = selectEntity(this.invoicesService, this.invoiceId);

    this.customer$ = this.invoice$.pipe(
      mergeMap(invoice => selectEntity(this.customersService, invoice.customerId))
    );

    this.phones$ = this.customer$.pipe(
      map(customer => {
        const phones = [];
        if (customer.phone1) {
          phones.push(this.formatPhone(customer.phone1));
        }
        if (customer.phone2) {
          phones.push(this.formatPhone(customer.phone2));
        }
        return phones;
      })
    );

    this.phones$.pipe(first()).subscribe(phones => {
      this.formService.form.patchValue({
        phone: phones[0]
      })
    });

    combineLatest([this.invoice$, this.customer$, this.customerAddressesService.entities$]).pipe(
      first()
    ).subscribe(([invoice, customer, customerAddresses]) => {

      const patch: any = {
        invoiceId: invoice.id,
        appointmentId: invoice.appointmentId,
        invoiceNumber: invoice.invoiceNumber,
        email: getCustomerEmail(customer),
        amount: 0
      };

      const customerAddress = this.customerAddressesService.getDefaultCustomerAddress(customerAddresses, customer.id);

      if (customerAddress) {
        patch['customerAddress1'] = customerAddress.address1;
        patch['customerCity'] = customerAddress.address2;
        patch['customerPostcode'] = customerAddress.postcode;
      }

      this.formService.form.patchValue(patch);

    });

    this.formService.form.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(formValue => {

      this.syncBillingAddress(formValue);
    });

  }

  formatPhone(phone: string): string {
    return '44|' + phone.replace(' ', '').replace('+44', '0');
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

  checkout() {

    this.errors = null;
    this.globalPaymentRequest = this.formService.form.value;

  }

  async processPaymentResult(globalPaymentResult: GlobalPaymentResult) {
    if (globalPaymentResult?.success) {

      await this.modalCtrl.dismiss({}, 'success');

      return;
    }

    this.globalPaymentRequest = null;
    this.errors = globalPaymentResult?.errors;

  }
}
