import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";
import {Appointment} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService
  extends EntityCollectionServiceBase<Appointment> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.Appointment, serviceElementsFactory);

  }

}
