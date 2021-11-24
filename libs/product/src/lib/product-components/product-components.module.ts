import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {ApplianceFormComponent} from "./appliance/appliance-form/appliance-form.component";
import {IonicCommonComponentsModule} from "@homecare/ionic-common";


@NgModule({
  declarations: [
    ApplianceFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    IonicCommonComponentsModule
  ],
  exports: [
    ApplianceFormComponent
  ]
})
export class ProductComponentsModule {
}
