import { NgModule } from '@angular/core';
import { CommonModule as AngularCommon } from '@angular/common';
import { ImageFileResizeDirective } from './directives/image-file-resize/image-file-resize.directive';



@NgModule({
  imports: [
    //AngularCommon
  ],
  declarations: [
    ImageFileResizeDirective
  ],
  exports: [
    ImageFileResizeDirective
  ]
})
export class CommonModule {}
