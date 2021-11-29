import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Document} from "@homecare/shared";
import {DocumentEntity} from "@homecare-nx/document";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService
  extends EntityCollectionServiceBase<Document> {

  constructor(
    serviceElementsFactory:
      EntityCollectionServiceElementsFactory) {

    super(DocumentEntity.Document, serviceElementsFactory);

  }

}
