import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";
import {AppointmentStatus} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class AppointmentStatusesService
  extends EntityCollectionServiceBase<AppointmentStatus> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.AppointmentStatus, serviceElementsFactory);

  }

}
