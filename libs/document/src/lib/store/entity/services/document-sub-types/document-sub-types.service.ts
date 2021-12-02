import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {DocumentSubType} from "@homecare/shared";
import {DocumentEntity} from "../../document.entities";

@Injectable({
  providedIn: 'root'
})
export class DocumentSubTypesService
  extends EntityCollectionServiceBase<DocumentSubType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(DocumentEntity.DocumentSubType, serviceElementsFactory);

  }

}
