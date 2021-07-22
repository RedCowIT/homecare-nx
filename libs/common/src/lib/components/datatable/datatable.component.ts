import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableSourceService} from "@homecare/common";
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'dd-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  selectionType = SelectionType.single;

  @Input()
  footerHeight = 40;

  @Input()
  source: TableSourceService;

  @Output()
  selectRow = new EventEmitter<unknown>();

  constructor() {
  }

  ngOnInit(): void {
  }

  select(event){
    this.selectRow.emit(event.selected);
  }
}
