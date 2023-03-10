import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {InvoicePaymentFormComponent} from "../invoice/invoice-payment-form/invoice-payment-form.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'hc-invoice-payment-modal',
  templateUrl: './invoice-payment-modal.component.html',
  styleUrls: ['./invoice-payment-modal.component.scss']
})
export class InvoicePaymentModalComponent implements OnInit {

  @Input()
  id: number;

  @Input()
  invoiceId: number;

  @ViewChild(InvoicePaymentFormComponent)
  invoicePaymentForm: InvoicePaymentFormComponent;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit(): void {

  }

  async delete() {
    await this.invoicePaymentForm.deleteEntity();
  }

  async save() {
    await this.invoicePaymentForm.submit();
  }

  async close(){
    await this.modalCtrl.dismiss();
  }
}
