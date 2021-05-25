import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";
import {AppointmentCallType} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class AppointmentCallTypesService
  extends EntityCollectionServiceBase<AppointmentCallType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.AppointmentCallType, serviceElementsFactory);

  }

}
