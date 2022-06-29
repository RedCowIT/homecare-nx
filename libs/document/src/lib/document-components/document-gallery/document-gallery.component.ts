import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {from, Observable} from "rxjs";
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
              public popoverCtrl: PopoverController,
              public cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.documents$ = this.documentsService.select(this.parentId, this.subId, this.documentTypeId, this.documentSubTypeId);

    this.documentsService.getWithQuery({
      parentId: `${this.parentId}`,
      subId: `${this.subId}`
    });

    // setTimeout(() => {
    //   this.documentsService.clearCache();
    // }, 2000);
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

    from(popover.onWillDismiss()).subscribe((data) => {
      if (data?.data?.option?.value === 'delete') {
        console.log('delete', document.id);
        this.documentsService.delete(document.id);
      }
    });

    // popover.onWillDismiss().then(
    //   (data: any) => {
    //
    //     // this.openModal(data.data.option);
    //
    //     if (data?.data?.option?.value === 'delete') {
    //       this.documentsService.delete(document.id);
    //     }
    //   }
    // );

    await popover.present();
  }
}
