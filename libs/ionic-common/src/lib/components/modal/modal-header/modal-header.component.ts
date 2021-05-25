import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ButtonConfig} from "../../../models/button-config";

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

  constructor(private modalCtrl: ModalController) { }

  ngOnInit(): void {
  }

  async closeModal(){
    await this.modalCtrl.dismiss();
  }

}
