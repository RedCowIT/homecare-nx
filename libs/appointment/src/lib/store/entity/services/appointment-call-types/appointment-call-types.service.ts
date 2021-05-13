import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";

@Injectable({
  providedIn: 'root'
})
export class AppointmentCallTypesService
  extends EntityCollectionServiceBase<AppointmentEntity.AppointmentCallType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.AppointmentCallType, serviceElementsFactory);

  }

}
