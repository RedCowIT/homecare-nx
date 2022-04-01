import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'hc-email-invoice-modal',
  templateUrl: './email-invoice-modal.component.html',
  styleUrls: ['./email-invoice-modal.component.scss']
})
export class EmailInvoiceModalComponent implements OnInit {

  @Input()
  id: number;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit(): void {
  }

  async done() {
    await this.modalCtrl.dismiss(null, 'success');
  }

}
