import {Component, Input, OnInit} from '@angular/core';
import {InvoicePaymentsService} from "../../store/entity/services/invoice/invoice-payments/invoice-payments.service";
import {Observable} from "rxjs";
import {InvoicePayment} from "@homecare/shared";
import {map} from "rxjs/operators";
import {InvoicePaymentTypesService} from "../../store/entity/services/invoice/invoice-payment-types/invoice-payment-types.service";
import {ModalController} from "@ionic/angular";
import {InvoicePaymentModalComponent} from "../invoice-payment-modal/invoice-payment-modal.component";

@Component({
  selector: 'hc-invoice-payment-item-list',
  templateUrl: './invoice-payment-item-list.component.html',
  styleUrls: ['./invoice-payment-item-list.component.scss']
})
export class InvoicePaymentItemListComponent implements OnInit {

  @Input()
  invoiceId: number;

  invoicePayments$: Observable<InvoicePayment[]>;

  constructor(public invoicePaymentsService: InvoicePaymentsService,
              public invoicePaymentTypesService: InvoicePaymentTypesService,
              public modalCtrl: ModalController) {

  }

  ngOnInit(): void {
    this.invoicePayments$ = this.invoicePaymentsService.entities$.pipe(
      map(invoicePayments => invoicePayments.filter(
        invoicePayment => invoicePayment.invoiceId === this.invoiceId))
    );

    this.invoicePaymentsService.getWithQuery({
      invoiceId: `${this.invoiceId}`
    });
  }

  async openModal(invoicePayment: InvoicePayment){
    const modal = await this.modalCtrl.create({
      component: InvoicePaymentModalComponent,
      componentProps: {
        id: invoicePayment.id,
        invoiceId: this.invoiceId
      }
    });

    await modal.present();
  }
}
