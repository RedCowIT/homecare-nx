import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'hc-appointment-no-answer-modal',
  templateUrl: './appointment-no-answer-modal.component.html',
  styleUrls: ['./appointment-no-answer-modal.component.scss']
})
export class AppointmentNoAnswerModalComponent implements OnInit {

  @Input()
  appointmentId: number;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit(): void {
  }

  async close(){
    await this.modalCtrl.dismiss();
  }
}
