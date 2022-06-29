import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Document} from "@homecare/shared";
import {DocumentEntity} from "../../document.entities";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

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

  select(parentId: number, subId: number, documentTypeId: number, documentSubTypeId: number): Observable<Document[]> {
    return this.entities$.pipe(
      map(documents => {
        return documents.filter(document => {

          const keep = document.parentId == parentId &&
            document.subId == subId &&
            document.documentTypeId == documentTypeId &&
            document.documentSubTypeId == documentSubTypeId;

          return keep;

        });
      })
    );
  }

}
