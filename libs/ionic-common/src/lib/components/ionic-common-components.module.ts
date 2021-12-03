import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalHeaderComponent} from "./modal/modal-header/modal-header.component";
import {IonicModule} from "@ionic/angular";
import {EntityFormSubmitComponent} from "./entity-form-submit/entity-form-submit.component";
import {SpinnerComponent} from './spinner/spinner.component';
import {ChecklistMenuItemComponent} from "./checklist/checklist-menu-item/checklist-menu-item.component";
import {ChecklistMenuComponent} from "./checklist/checklist-menu/checklist-menu.component";
import {RouterModule} from "@angular/router";
import {IconTileComponent} from './icon-tile/icon-tile.component';
import {PopoverSelectComponent} from './popover-select/popover-select.component';
import { PopoverSelectButtonComponent } from './popover-select-button/popover-select-button.component';
import { EntitySelectComponent } from './entity-select/entity-select.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AccordionComponent } from './accordion/accordion/accordion.component';
import { AccordionItemComponent } from './accordion/accordion-item/accordion-item.component';

@NgModule({
  declarations: [
    ModalHeaderComponent,
    EntityFormSubmitComponent,
    SpinnerComponent,
    ChecklistMenuItemComponent,
    ChecklistMenuComponent,
    IconTileComponent,
    PopoverSelectComponent,
    PopoverSelectButtonComponent,
    EntitySelectComponent,
    AccordionComponent,
    AccordionItemComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalHeaderComponent,
    EntityFormSubmitComponent,
    SpinnerComponent,
    ChecklistMenuComponent,
    ChecklistMenuItemComponent,
    IconTileComponent,
    PopoverSelectComponent,
    EntitySelectComponent,
    AccordionComponent,
    AccordionItemComponent
  ]
})
export class IonicCommonComponentsModule {}
