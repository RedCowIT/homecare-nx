import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Document} from "@homecare/shared";
import {finalize, first} from "rxjs/operators";
import {DocumentUploadService} from "../../services/document-upload/document-upload.service";

@Component({
  selector: 'hc-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  @Input()
  parentId: number;

  @Input()
  subId: number;

  @Input()
  documentTypeId: number;

  @Input()
  documentSubTypeId: number;

  @Output()
  uploaded = new EventEmitter<Document>();

  @ViewChild('fileInput')
  fileInput: ElementRef;

  isLoading: boolean;

  hidden: boolean;

  constructor(protected documentUploadService: DocumentUploadService) { }

  ngOnInit(): void {
  }

  onImageResize(result: {dataUrl: any, blob: any, filename: string}){
    console.log('onImageResize', {result});
    const formData = new FormData();
    formData.append('parentId', `${this.parentId}`);
    formData.append('subId', `${this.subId}`);
    formData.append('documentTypeId', `${this.documentTypeId}`);
    formData.append('documentSubTypeId', `${this.documentSubTypeId}`);
    formData.append('file[]', new File([result.blob], result.filename));

    this.isLoading = true;

    this.documentUploadService.upload(formData).pipe(
      first(),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(document => {
      this.uploaded.emit(document);
    });
  }

  openFileSelector() {
    this.fileInput.nativeElement.click();
  }
}
