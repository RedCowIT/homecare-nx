import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";

@Injectable({
  providedIn: 'root'
})
export class AppointmentStatusesService
  extends EntityCollectionServiceBase<AppointmentEntity.AppointmentStatus> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.AppointmentStatus, serviceElementsFactory);

  }

}
