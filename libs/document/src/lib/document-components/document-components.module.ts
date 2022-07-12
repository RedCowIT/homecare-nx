import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as LibCommonModule } from '@homecare/common';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { DocumentGalleryComponent } from './document-gallery/document-gallery.component';
import { DocumentThumbnailComponent } from './document-thumbnail/document-thumbnail.component';
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [
    DocumentUploadComponent,
    DocumentGalleryComponent,
    DocumentThumbnailComponent
  ],
  imports: [
    CommonModule,
    LibCommonModule,
    IonicModule
  ],
  exports: [
    DocumentUploadComponent,
    DocumentGalleryComponent
  ]
})
export class DocumentComponentsModule { }
