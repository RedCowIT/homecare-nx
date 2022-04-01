import { NgModule } from '@angular/core';
import { SignaturePadComponent } from './signature-pad.component';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";

@NgModule({
  imports: [IonicModule],
  declarations: [SignaturePadComponent],
  exports: [SignaturePadComponent]
})
export class SignaturePadModule { }
