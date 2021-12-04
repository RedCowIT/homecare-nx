import {Component, Input, OnInit} from '@angular/core';
import {InvoiceTableService} from "../../../services/invoice/invoice-table/invoice-table.service";
import {InvoiceItemModalComponent} from "../invoice-item-modal/invoice-item-modal.component";
import {ModalController} from "@ionic/angular";
import {InvoiceSummaryService} from "../../../services/invoice/invoice-summary/invoice-summary.service";

@Component({
  selector: 'hc-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss'],
  providers: [InvoiceTableService, InvoiceSummaryService]
})
export class InvoiceTableComponent implements OnInit {

  @Input()
  invoiceId: number;

  constructor(public invoiceTableService: InvoiceTableService,
              public invoiceSummaryService: InvoiceSummaryService,
              public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.invoiceTableService.init(this.invoiceId);
    this.invoiceSummaryService.init(this.invoiceId);
    this.load();
  }

  async openInvoiceItemMenu() {

  }

  public load() {
    console.log('InvoiceTable.load');
    this.invoiceTableService.load();
  }

  async select(item) {
    console.log('select', item[0]);
    await this.openModal(item[0].id);
  }

  async openModal(invoiceItemId) {
    const modal = await this.modalCtrl.create({
      component: InvoiceItemModalComponent,
      componentProps: {
        invoiceId: this.invoiceId,
        invoiceItemId
      }
    });

    modal.onWillDismiss().then(
      (data: any) => {
        this.load();
      }
    );

    await modal.present();

  }
}
