import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";

@Injectable({
  providedIn: 'root'
})
export class CallTypesService
  extends EntityCollectionServiceBase<AppointmentEntity.CallType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.CallType, serviceElementsFactory);

  }

}
