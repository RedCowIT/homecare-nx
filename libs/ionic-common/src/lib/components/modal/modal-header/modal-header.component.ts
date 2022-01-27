import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ButtonConfig} from "@homecare/common";


@Component({
  selector: 'dd-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss']
})
export class ModalHeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  buttons: ButtonConfig[] = [];

  @Input()
  isDanger = false;

  @Input()
  disableClose = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit(): void {
    console.log('modal header', this.isDanger);
  }

  async closeModal(){
    await this.modalCtrl.dismiss();
  }

}
