import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'hc-email-customer-plan-finance-document-modal',
  templateUrl: './email-customer-plan-finance-document-modal.component.html',
  styleUrls: ['./email-customer-plan-finance-document-modal.component.scss']
})
export class EmailCustomerPlanFinanceDocumentModalComponent implements OnInit {

  @Input()
  id: number;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit(): void {
  }

  async done(){
    await this.modalCtrl.dismiss();
  }
}
