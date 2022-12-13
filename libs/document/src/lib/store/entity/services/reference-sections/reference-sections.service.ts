import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {ReferenceSection} from "@homecare/shared";
import {DocumentEntity} from "../../document.entities";

@Injectable({
  providedIn: 'root'
})
export class ReferenceSectionsService
  extends EntityCollectionServiceBase<ReferenceSection> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(DocumentEntity.ReferenceSection, serviceElementsFactory);

  }

}
