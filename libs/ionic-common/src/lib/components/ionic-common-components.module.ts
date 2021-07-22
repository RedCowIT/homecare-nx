import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalHeaderComponent} from "./modal/modal-header/modal-header.component";
import {IonicModule} from "@ionic/angular";
import {EntityFormSubmitComponent} from "./entity-form-submit/entity-form-submit.component";
import {SpinnerComponent} from './spinner/spinner.component';
import {ChecklistMenuItemComponent} from "./checklist/checklist-menu-item/checklist-menu-item.component";
import {ChecklistMenuComponent} from "./checklist/checklist-menu/checklist-menu.component";
import {RouterModule} from "@angular/router";
import { IconTileComponent } from './icon-tile/icon-tile.component';

@NgModule({
  declarations: [
    ModalHeaderComponent,
    EntityFormSubmitComponent,
    SpinnerComponent,
    ChecklistMenuItemComponent,
    ChecklistMenuComponent,
    IconTileComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    ModalHeaderComponent,
    EntityFormSubmitComponent,
    SpinnerComponent,
    ChecklistMenuComponent,
    ChecklistMenuItemComponent,
    IconTileComponent
  ]
})
export class IonicCommonComponentsModule {}
