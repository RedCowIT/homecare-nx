import {Component, Input, OnChanges} from '@angular/core';
import {ChecklistItemStatus, ChecklistMenuItem} from "@homecare/common";

@Component({
  selector: 'dd-checklist-menu-item',
  templateUrl: './checklist-menu-item.component.html',
  styleUrls: ['./checklist-menu-item.component.scss']
})
export class ChecklistMenuItemComponent {

  @Input()
  checklistMenuItem: ChecklistMenuItem;

  @Input()
  color: string;

  @Input()
  showIcon: boolean;
}
