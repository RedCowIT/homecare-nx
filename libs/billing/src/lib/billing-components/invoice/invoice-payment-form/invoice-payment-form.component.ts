import {Component, Input, OnInit} from '@angular/core';
import {InvoicePaymentFormService} from "../../../services/form/invoice/invoice-payment-form/invoice-payment-form.service";
import {InvoicePaymentTypesService} from "../../../store/entity/services/invoice/invoice-payment-types/invoice-payment-types.service";
import {EntityFormContainer} from "@homecare/entity";
import {
  InvoiceItemTypes,
  InvoicePayment,
  InvoicePaymentType,
  InvoicePaymentTypes,
  selectEntity,
  selectFirstEntityByKey
} from "@homecare/shared";
import {InvoicePaymentsService} from "../../../store/entity/services/invoice/invoice-payments/invoice-payments.service";
import {first, mergeMap, takeUntil} from "rxjs/operators";
import {Observable} from "rxjs";
import {PopoverSelectComponent} from "../../../../../../ionic-common/src/lib/components/popover-select/popover-select.component";
import {PopoverController} from "@ionic/angular";
import {SelectOption} from "@homecare/common";
import {InvoicesService} from "../../../store/entity/services/invoice/invoices/invoices.service";

@Component({
  selector: 'hc-invoice-payment-form',
  templateUrl: './invoice-payment-form.component.html',
  styleUrls: ['./invoice-payment-form.component.scss'],
  providers: [InvoicePaymentFormService]
})
export class InvoicePaymentFormComponent extends EntityFormContainer<InvoicePayment> implements OnInit {

  @Input()
  invoiceId: number;

  readonly defaultPaymentType = InvoicePaymentTypes.Card;

  invoicePaymentType: InvoicePaymentType;

  paymentTypeOptions: SelectOption[] = [
    {
      label: InvoicePaymentTypes.Card, value: InvoicePaymentTypes.Card
    },
    {
      label: InvoicePaymentTypes.Cash, value: InvoicePaymentTypes.Cash
    },
    {
      label: InvoicePaymentTypes.Cheque, value: InvoicePaymentTypes.Cheque
    }
  ];

  constructor(public formService: InvoicePaymentFormService,
              public entityService: InvoicePaymentsService,
              public invoicePaymentTypesService: InvoicePaymentTypesService,
              public invoicesService: InvoicesService,
              public popoverCtrl: PopoverController) {
    super(formService, entityService);
  }

  ngOnInit(): void {

    super.ngOnInit();

    this.formService.form.get('paymentTypeId').valueChanges.pipe(
      mergeMap(paymentTypeId =>
        selectEntity(this.invoicePaymentTypesService, paymentTypeId)),
      takeUntil(this.destroyed$)
    ).subscribe(paymentType => {
      this.invoicePaymentType = paymentType;
    });

    this.invoicePaymentTypesService.selectByDescription(this.defaultPaymentType).pipe(
      first()
    ).subscribe((paymentType) => {

      console.log('default invoice item type', paymentType);

      this.patchForm({
        invoiceId: this.invoiceId,
        paymentTypeId: paymentType.id
      });

    })

  }

  async changePaymentType($event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverSelectComponent,
      componentProps: {
        options: this.paymentTypeOptions
      },
      event: $event
    });

    popover.onWillDismiss().then(
      (data: any) => {
        console.log('onWillDismiss', data.data);
        // this.openModal(data.data.option);

        this.invoicePaymentTypesService.selectByDescription(data.data.option.value).pipe(
          first()
        ).subscribe((paymentType) => {
          this.patchForm({
            paymentTypeId: paymentType.id
          });
        });
      }
    );

    await popover.present();
  }

  addFullAmount() {
    selectEntity(this.invoicesService, this.invoiceId).pipe(
      first()
    ).subscribe(invoice => {

      if (invoice.grossAmount){
        this.patchForm({
          amount: invoice.grossAmount
        });
      }

    });
  }
}
