import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";
import {AppointmentNoAnswerReason} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class AppointmentNoAnswerReasonsService
  extends EntityCollectionServiceBase<AppointmentNoAnswerReason> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.AppointmentNoAnswerReason, serviceElementsFactory);

  }

}
