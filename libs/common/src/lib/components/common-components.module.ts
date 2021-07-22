import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import { DatatableComponent } from './datatable/datatable.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";


@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxDatatableModule
  ],
  exports: [
    DatatableComponent
  ]
})
export class CommonComponentsModule {}
