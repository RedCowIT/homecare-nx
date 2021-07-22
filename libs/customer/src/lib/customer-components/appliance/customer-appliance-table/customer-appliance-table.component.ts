import {Component, Input, OnInit} from '@angular/core';
import {CustomerApplianceTableService} from "../../../services/customer-appliance-table.service";
import {ModalController} from "@ionic/angular";
import {CustomerApplianceModalComponent} from "../customer-appliance-modal/customer-appliance-modal.component";

@Component({
  selector: 'hc-customer-appliance-table',
  templateUrl: './customer-appliance-table.component.html',
  styleUrls: ['./customer-appliance-table.component.scss'],
  providers: [CustomerApplianceTableService]
})
export class CustomerApplianceTableComponent implements OnInit {

  @Input()
  customerId: number;

  constructor(public customerApplianceTableService: CustomerApplianceTableService,
              private modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.customerApplianceTableService.init(this.customerId);
    this.customerApplianceTableService.load();
  }

  async select(row) {
    await this.openModal(row[0].id);
  }

  async openModal(id: number) {

    const modal = await this.modalCtrl.create({
      component: CustomerApplianceModalComponent,
      componentProps: {
        id,
        customerId: this.customerId
      }
    });

    await modal.present();
  }
}
