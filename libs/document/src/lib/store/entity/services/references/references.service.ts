import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Reference} from "@homecare/shared";
import {DocumentEntity} from "../../document.entities";

@Injectable({
  providedIn: 'root'
})
export class ReferencesService
  extends EntityCollectionServiceBase<Reference> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(DocumentEntity.Reference, serviceElementsFactory);

  }

}
