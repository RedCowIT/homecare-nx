import {Component, Input, OnInit} from '@angular/core';
import {ChecklistMenuItem} from "@homecare/common";

@Component({
  selector: 'dd-checklist-menu',
  templateUrl: './checklist-menu.component.html',
  styleUrls: ['./checklist-menu.component.scss']
})
export class ChecklistMenuComponent implements OnInit {

  @Input()
  checklistMenuItems: ChecklistMenuItem[];

  @Input()
  color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
