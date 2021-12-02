import {Component, Input, OnInit} from '@angular/core';
import {Document} from "@homecare/shared";

@Component({
  selector: 'hc-document-thumbnail',
  templateUrl: './document-thumbnail.component.html',
  styleUrls: ['./document-thumbnail.component.scss']
})
export class DocumentThumbnailComponent implements OnInit {

  @Input()
  document: Document;

  constructor() { }

  ngOnInit(): void {
  }

}
