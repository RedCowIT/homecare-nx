import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalHeaderComponent} from "./modal/modal-header/modal-header.component";
import {IonicModule} from "@ionic/angular";
import {EntityFormSubmitComponent} from "./entity-form-submit/entity-form-submit.component";
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    ModalHeaderComponent,
    EntityFormSubmitComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ModalHeaderComponent,
    EntityFormSubmitComponent
  ]
})
export class IonicCommonComponentsModule {}
