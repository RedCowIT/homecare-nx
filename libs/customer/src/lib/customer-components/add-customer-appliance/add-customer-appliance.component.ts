import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CustomerApplianceModalComponent} from "../appliance/customer-appliance-modal/customer-appliance-modal.component";

@Component({
  selector: 'hc-add-customer-appliance',
  templateUrl: './add-customer-appliance.component.html',
  styleUrls: ['./add-customer-appliance.component.scss']
})
export class AddCustomerApplianceComponent implements OnInit {

  @Input()
  customerId: number;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit(): void {
  }

  async openModal() {

    const modal = await this.modalCtrl.create({
      component: CustomerApplianceModalComponent,
      componentProps: {
        customerId: this.customerId
      }
    });

    await modal.present();
  }
}
