import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {EmploymentStatusTime} from "@homecare/shared";
import {CustomerEntity} from "../../customer.entities";

@Injectable({
  providedIn: 'root'
})
export class EmploymentStatusTimesService
  extends EntityCollectionServiceBase<EmploymentStatusTime> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(CustomerEntity.EmploymentStatusTime, serviceElementsFactory);

  }

}

