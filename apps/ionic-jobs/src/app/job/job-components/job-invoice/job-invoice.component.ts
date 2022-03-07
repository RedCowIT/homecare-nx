import {Component, OnInit, ViewChild} from '@angular/core';
import {CurrentJobService} from "../../services/current-job/current-job.service";
import {filter, first, map, mergeMap, takeUntil} from "rxjs/operators";
import {
  Invoice,
  Quote,
  selectEntityByKey,
  selectFirstEntityByKey,
  selectOrFetchFirstEntityByKey, SubscribedContainer
} from "@homecare/shared";
import {InvoicePaymentsService, InvoicesService} from "@homecare/billing";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {BooleanValue, ButtonConfig} from "@homecare/common";
import {createFooterNextButton} from "../../support/footer-button-factory";
import {LoggerService} from "@homecare/core";
import {InvoiceNotesFormComponent} from "../../../../../../../libs/billing/src/lib/billing-components/invoice/invoice-notes-form/invoice-notes-form.component";
import {AlertService} from "../../../../../../../libs/core/src/lib/services/alert/alert.service";
import {ModalController} from "@ionic/angular";
import {EmailInvoiceModalComponent} from "../../../../../../../libs/billing/src/lib/billing-components/invoice/email-invoice-modal/email-invoice-modal.component";


@Component({
  selector: 'hc-job-invoice',
  templateUrl: './job-invoice.component.html',
  styleUrls: ['./job-invoice.component.scss']
})
export class JobInvoiceComponent extends SubscribedContainer implements OnInit {

  footerButtons$ = new BehaviorSubject<ButtonConfig[]>([]);

  showPaymentForm$: Observable<BooleanValue>;

  addMultiplePayment = false;

  @ViewChild(InvoiceNotesFormComponent)
  invoiceNotesForm: InvoiceNotesFormComponent;

  constructor(public currentJobService: CurrentJobService,
              public invoicesService: InvoicesService,
              public invoicePaymentsService: InvoicePaymentsService,
              public modalCtrl: ModalController,
              private alertService: AlertService,
              private logger: LoggerService) {
    super();
  }

  ngOnInit(): void {

    this.footerButtons$.next([
      createFooterNextButton(async () => {

        this.complete();

      })
    ])

    // check cache, then query, then create.
    const invoice$ = selectOrFetchFirstEntityByKey(this.invoicesService, 'appointmentId', this.currentJobService.appointmentId);

    invoice$
      .pipe(first())
      .subscribe(invoice => {
        if (!invoice) {
          this.logger.debug('Creating invoice for appointment: ' + this.currentJobService.appointmentId);
          this.invoicesService.add({
            appointmentId: this.currentJobService.appointmentId
          } as Invoice);
        }
      });


    this.showPaymentForm$ = combineLatest([this.currentJobService.invoice$, this.invoicePaymentsService.entities$]).pipe(
      filter(([invoice, invoicePayments]) => !!invoice),
      map(([invoice, invoicePayments]) => {

        const paymentsFound = invoicePayments.filter(invoicePayment => invoicePayment.invoiceId === invoice.id);

        return {
          value: paymentsFound.length === 0
        }
      })
    );
  }

  invoicePaymentCreated(payment) {
    console.log('invoicePaymentCreated', payment);
    this.addMultiplePayment = false;
  }

  publishInvoice() {

    console.log('publishInvoice');

    this.currentJobService.invoice$.pipe(first()).subscribe(invoice => {

      console.log('updating...', invoice);

      const notes = this.invoiceNotesForm.getValue();

      let invoiceUpdate = {
        ...invoice,
        published: true,
        notes: notes.notes,
        serviceNotes: notes.serviceNotes
      };

      this.invoicesService.update(invoiceUpdate).pipe(
        first()
      ).subscribe(async invoice => {
        await this.presentEmailInvoiceModal(invoice);
      });

    });
  }

  complete() {

    console.log('Complete invoice!');

    if (this.invoiceNotesForm.validate()) {

      console.log('Validated');
      this.currentJobService.invoice$.pipe(
        mergeMap(invoice => {
          return selectEntityByKey(this.invoicePaymentsService, 'invoiceId', invoice.id).pipe(
            map(invoicePayments => {
              return {
                invoice, invoicePayments
              }
            })
          )
        }),
        first()
      ).subscribe(async result => {

        if (result.invoice.grossAmount > 0 && !result.invoicePayments?.length) {
          await this.alertService.error('Invoice requires a payment');
        } else {
          this.publishInvoice();
        }

      });

    } else {

      console.log('Invalid');

    }

  }

  async presentEmailInvoiceModal(invoice: Invoice) {

    const modal = await this.modalCtrl.create({
      component: EmailInvoiceModalComponent,
      componentProps: {
        invoice
      }
    });

    await modal.present();

  }

}
