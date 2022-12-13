import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";
import {AppointmentSummary} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class AppointmentSummariesService
  extends EntityCollectionServiceBase<AppointmentSummary> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.AppointmentSummary, serviceElementsFactory);

  }

}
