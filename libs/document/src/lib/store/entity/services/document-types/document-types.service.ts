import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {DocumentType} from "@homecare/shared";
import {DocumentEntity} from "../../document.entities";

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService
  extends EntityCollectionServiceBase<DocumentType> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(DocumentEntity.DocumentType, serviceElementsFactory);

  }

}
