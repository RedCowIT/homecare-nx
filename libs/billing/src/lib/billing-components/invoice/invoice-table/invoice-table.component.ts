import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
export class InvoiceTableComponent implements OnInit, AfterViewInit {

  @Input()
  invoiceId: number;

  @ViewChild('valueTemplate') valueTmpl: TemplateRef<any> | undefined;

  constructor(public invoiceTableService: InvoiceTableService,
              public invoiceSummaryService: InvoiceSummaryService,
              public modalCtrl: ModalController,
              public cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.invoiceTableService.init(this.invoiceId, {value: this.valueTmpl});
    this.invoiceSummaryService.init(this.invoiceId);
    this.load();
    this.cdRef.detectChanges();
  }



  async openInvoiceItemMenu() {

  }

  public load() {
    this.invoiceTableService.load();
  }

  async select(item) {
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
