import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";

@Injectable({
  providedIn: 'root'
})
export class AppointmentNoAnswerReasonsService
  extends EntityCollectionServiceBase<AppointmentEntity.AppointmentNoAnswerReason> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.AppointmentNoAnswerReason, serviceElementsFactory);

  }

}
