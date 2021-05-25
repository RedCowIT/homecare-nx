import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {AppointmentEntity} from "../../appointment.entities";
import {CallTypeClass} from "@homecare/shared";

@Injectable({
  providedIn: 'root'
})
export class CallTypeClassesService
  extends EntityCollectionServiceBase<CallTypeClass> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(AppointmentEntity.CallTypeClass, serviceElementsFactory);

  }

}
