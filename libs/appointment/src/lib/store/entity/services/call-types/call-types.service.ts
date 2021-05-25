import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";
import {CallType} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class CallTypesService
  extends EntityCollectionServiceBase<CallType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.CallType, serviceElementsFactory);

  }

}
