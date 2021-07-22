import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";
import {AppointmentVisit} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class AppointmentVisitsService
  extends EntityCollectionServiceBase<AppointmentVisit> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.AppointmentVisit, serviceElementsFactory);

  }

}
