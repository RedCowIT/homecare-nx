import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DocumentsService} from "../../store/entity/services/documents/documents.service";
import {map} from "rxjs/operators";
import {Document} from "@homecare/shared";

@Component({
  selector: 'hc-document-gallery',
  templateUrl: './document-gallery.component.html',
  styleUrls: ['./document-gallery.component.scss']
})
export class DocumentGalleryComponent implements OnInit {

  @Input()
  parentId: number;

  @Input()
  subId: number;

  @Input()
  documentTypeId: number;

  @Input()
  documentSubTypeId: number;

  documents$: Observable<Document[]>;

  constructor(public documentsService: DocumentsService) {
  }

  ngOnInit(): void {

    this.documents$ = this.documentsService.entities$.pipe(
      map(documents => {
        return documents.filter(document => {



          const keep = document.parentId == this.parentId &&
            document.subId == this.subId &&
            document.documentTypeId == this.documentTypeId &&
            document.documentSubTypeId == this.documentSubTypeId;

          console.log('document', {subType: this.documentSubTypeId, document, keep});

          return keep;

        });
      })
    );

  }

}
