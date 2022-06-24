import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoicePaymentFormService} from "../../../services/form/invoice/invoice-payment-form/invoice-payment-form.service";
import {InvoicePaymentTypesService} from "../../../store/entity/services/invoice/invoice-payment-types/invoice-payment-types.service";
import {EntityFormContainer} from "@homecare/entity";
import {
  firstByKey,
  InvoiceItemTypes,
  InvoicePayment,
  InvoicePaymentType,
  InvoicePaymentTypes,
  selectEntity,
  selectFirstEntityByKey
} from "@homecare/shared";
import {InvoicePaymentsService} from "../../../store/entity/services/invoice/invoice-payments/invoice-payments.service";
import {distinctUntilChanged, first, map, mergeMap, takeUntil} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";
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
  id: number;

  @Input()
  invoiceId: number;

  @Input()
  hideSubmit = false;

  @Output()
  create = new EventEmitter<InvoicePayment>();

  saveLabel: string;

  showForm = true;

  readonly defaultPaymentType = InvoicePaymentTypes.Card;

  invoicePaymentType: InvoicePaymentType;

  paymentTypeOptions: SelectOption[] = [
    {
      label: InvoicePaymentTypes.Card, value: InvoicePaymentTypes.PendingCard
    },
    {
      label: InvoicePaymentTypes.Cash, value: InvoicePaymentTypes.PendingCash
    },
    {
      label: InvoicePaymentTypes.Cheque, value: InvoicePaymentTypes.PendingCheque
    }
  ];

  paymentTypeOptions$: Observable<SelectOption[]>;

  constructor(public formService: InvoicePaymentFormService,
              public entityService: InvoicePaymentsService,
              public invoicePaymentTypesService: InvoicePaymentTypesService,
              public invoicesService: InvoicesService,
              public invoicePaymentsService: InvoicePaymentsService,
              public popoverCtrl: PopoverController) {
    super(formService, entityService);
  }

  ngOnInit(): void {

    super.ngOnInit();

    if (this.id) {
      this.saveLabel = 'Save';
    } else {
      this.saveLabel = 'Add Payment';
    }

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

      this.patchForm({
        invoiceId: this.invoiceId,
        paymentTypeId: paymentType.id
      });

    });

    // Only allow one payment per payment type
    this.paymentTypeOptions$ = combineLatest([
      this.invoicePaymentTypesService.entities$,
      this.invoicePaymentsService.entities$
    ]).pipe(
      map(([paymentTypes, invoicePayments]) => {

        invoicePayments = invoicePayments.filter(invoicePayment => invoicePayment.invoiceId);

        return this.paymentTypeOptions.filter(paymentTypeOption => {

          const paymentType = firstByKey(paymentTypes, 'description', paymentTypeOption.value);

          return firstByKey(invoicePayments, 'paymentTypeId', paymentType.id) === null;

        });
      })
    );

    if (this.model$) {
      this.showForm = true;
      this.model$.pipe(first()).subscribe(invoicePayment => {
        this.patchForm({
          paymentTypeId: invoicePayment.paymentTypeId
        });
      });
    } else {
      this.paymentTypeOptions$.pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      ).subscribe(
        paymentTypeOptions => {

          if (paymentTypeOptions.length) {
            this.showForm = true;
            this.setPaymentType(paymentTypeOptions[0].value);
          } else {
            this.showForm = false;
          }
        }
      );
    }


  }

  async changePaymentType($event) {

    this.paymentTypeOptions$.pipe(first()).subscribe(
      async paymentTypeOptions => {

        const popover = await this.popoverCtrl.create({
          component: PopoverSelectComponent,
          componentProps: {
            options: paymentTypeOptions
          },
          event: $event
        });

        popover.onWillDismiss().then(
          (data: any) => {
            if (!data.data) {
              return;
            }
            this.setPaymentType(data.data.option.value);
          }
        );

        await popover.present();

      }
    );

  }

  setPaymentType(description: string) {
    this.invoicePaymentTypesService.selectByDescription(description).pipe(
      first()
    ).subscribe((paymentType) => {
      this.patchForm({
        paymentTypeId: paymentType.id
      });
    });
  }

  addFullAmount() {

    selectEntity(this.invoicesService, this.invoiceId).pipe(
      first()
    ).subscribe(invoice => {

      if (invoice.grossAmount) {
        this.patchForm({
          amount: invoice.grossAmount
        });
      }

    });
  }

  getDescription(invoicePaymentType: InvoicePaymentType): string {

    switch (invoicePaymentType.description) {
      case InvoicePaymentTypes.PendingCard:
        return InvoicePaymentTypes.Card;
      case InvoicePaymentTypes.PendingCash:
        return InvoicePaymentTypes.Cash;
      case InvoicePaymentTypes.PendingCheque:
        return InvoicePaymentTypes.Cheque;
    }

    return invoicePaymentType.description;
  }

  protected async entityCreated(entity: InvoicePayment) {
    await super.entityCreated(entity);
    this.formService.reset();
    this.id = null;

  }

  protected async entityUpdated(entity: InvoicePayment) {
    await super.entityUpdated(entity);
    this.formService.reset();
    this.id = null;

  }

  protected async entityDeleted(entity: InvoicePayment) {
    await super.entityDeleted(entity);
    this.formService.reset();
    this.id = null;

  }
}
