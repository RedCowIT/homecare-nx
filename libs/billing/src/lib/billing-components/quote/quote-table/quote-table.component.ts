import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {QuoteTableService} from "../../../services/quote/quote-table/quote-table.service";

@Component({
  selector: 'hc-quote-table',
  templateUrl: './quote-table.component.html',
  styleUrls: ['./quote-table.component.scss'],
  providers: [QuoteTableService]
})
export class QuoteTableComponent implements OnInit {

  @Input()
  quoteId: number;

  constructor(public quoteTableService: QuoteTableService,
              private modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.quoteTableService.init(this.quoteId);
    this.quoteTableService.load();
  }

  async select(row) {
    await this.openModal(row[0].id);
  }

  async openModal(id: number) {

    // switch based on quote item type

    // const modal = await this.modalCtrl.create({
    //   component: CustomerApplianceModalComponent,
    //   componentProps: {
    //     id,
    //     customerId: this.customerId
    //   }
    // });
    //
    // await modal.present();
  }

}
