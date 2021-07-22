import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'hc-customer-appliance-modal',
  templateUrl: './customer-appliance-modal.component.html',
  styleUrls: ['./customer-appliance-modal.component.scss']
})
export class CustomerApplianceModalComponent implements OnInit {

  @Input()
  id: number;

  @Input()
  customerId: number;

  title: string;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.title = 'Customer Appliance';
  }

  async close(){
    await this.modalCtrl.dismiss();
  }
}
