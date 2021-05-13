import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";

@Injectable({
  providedIn: 'root'
})
export class AppointmentNoAnswersService
  extends EntityCollectionServiceBase<AppointmentEntity.AppointmentNoAnswer> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.AppointmentNoAnswer, serviceElementsFactory);

  }

}
