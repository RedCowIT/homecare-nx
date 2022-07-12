import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {imageFileResize} from "../../utils/image-utils";

@Directive({
  selector: '[ddImageFileResize]'
})
export class ImageFileResizeDirective {

  @Input()
  quality = 0.6;

  @Input()
  maxSize = 960;

  @Output()
  imageResize = new EventEmitter<{ dataUrl: any, blob: any, filename: string }>();

  @HostListener('change', ['$event']) onChange($event) {
    this.fileResize($event);
  }

  constructor() {
  }

  protected fileResize($event) {
    const file = $event.target.files[0];
    imageFileResize({
      file,
      maxSize: this.maxSize,
      quality: this.quality,
      onResize: (result => {
        this.imageResize.emit(result);
      })
    });
  }
}
