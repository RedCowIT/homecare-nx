import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DocumentsService} from "../../store/entity/services/documents/documents.service";
import {first, map} from "rxjs/operators";
import {Document, InvoicePaymentTypes} from "@homecare/shared";
import {PopoverController} from "@ionic/angular";
import {PopoverSelectComponent} from "../../../../../ionic-common/src/lib/components/popover-select/popover-select.component";

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

  constructor(public documentsService: DocumentsService,
              public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {

    this.documents$ = this.documentsService.entities$.pipe(
      map(documents => {
        return documents.filter(document => {


          const keep = document.parentId == this.parentId &&
            document.subId == this.subId &&
            document.documentTypeId == this.documentTypeId &&
            document.documentSubTypeId == this.documentSubTypeId;

          console.log('document', {
            filter: {
              parentId: this.parentId,
              subId: this.subId,
              documentTypeId: this.documentTypeId,
              documentSubTypeId: this.documentSubTypeId
            }, document, keep
          });

          return keep;

        });
      })
    );

  }

  async select($event, document: Document) {
    const popover = await this.popoverCtrl.create({
      component: PopoverSelectComponent,
      componentProps: {
        options: [
          {
            label: 'Delete Document', value: 'delete'
          }
        ]
      },
      event: $event
    });

    popover.onWillDismiss().then(
      (data: any) => {
        console.log('onWillDismiss', data.data);
        // this.openModal(data.data.option);

        if (data?.data?.option?.value === 'delete') {
          this.documentsService.delete({id: document.id} as Document).pipe(
            first()
          ).subscribe();
        }

      }
    );

    await popover.present();
  }
}
