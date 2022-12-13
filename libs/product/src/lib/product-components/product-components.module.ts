import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

import {IonicCommonComponentsModule} from "@homecare/ionic-common";
import { StockTableComponent } from './stock/stock-table/stock-table.component';
import {CommonComponentsModule} from "../../../../common/src/lib/components/common-components.module";


@NgModule({
  declarations: [
    StockTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CommonComponentsModule,
    IonicCommonComponentsModule
  ],
  exports: [
    StockTableComponent
  ]
})
export class ProductComponentsModule {
}
