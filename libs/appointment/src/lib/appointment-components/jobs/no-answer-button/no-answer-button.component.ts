import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AppointmentNoAnswerFormComponent} from "../../appointment-no-answer-form/appointment-no-answer-form.component";
import {AppointmentNoAnswerModalComponent} from "../../appointment-no-answer-modal/appointment-no-answer-modal.component";

@Component({
  selector: 'hc-no-answer-button',
  templateUrl: './no-answer-button.component.html',
  styleUrls: ['./no-answer-button.component.scss']
})
export class NoAnswerButtonComponent implements OnInit {

  @Input()
  appointmentId: number;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit(): void {

  }

  async openModal() {

    const modal = await this.modalCtrl.create({
      component: AppointmentNoAnswerModalComponent,
      componentProps: {
        appointmentId: this.appointmentId
      }
    });

    await modal.present();
  }
}
