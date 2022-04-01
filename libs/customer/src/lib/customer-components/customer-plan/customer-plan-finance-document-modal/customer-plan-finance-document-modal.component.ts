import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {EmailCustomerPlanFinanceDocumentModalComponent} from "../email-customer-plan-finance-document-modal/email-customer-plan-finance-document-modal.component";

@Component({
  selector: 'hc-customer-plan-finance-document-modal',
  templateUrl: './customer-plan-finance-document-modal.component.html',
  styleUrls: ['./customer-plan-finance-document-modal.component.scss']
})
export class CustomerPlanFinanceDocumentModalComponent implements OnInit {

  @Input()
  id: number;

  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
  }

  async updated() {

    // await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: EmailCustomerPlanFinanceDocumentModalComponent,
      componentProps: {
        id: this.id
      }
    });

    modal.onDidDismiss().then(async () => {
      await this.close();
    });

    await modal.present();
  }

  async close() {
    await this.modalCtrl.dismiss();
  }
}
