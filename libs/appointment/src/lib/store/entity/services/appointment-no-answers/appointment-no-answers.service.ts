import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";
import {AppointmentNoAnswer} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class AppointmentNoAnswersService
  extends EntityCollectionServiceBase<AppointmentNoAnswer> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.AppointmentNoAnswer, serviceElementsFactory);

  }

}
