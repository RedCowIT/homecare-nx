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
  rowHeight = 'auto';

  @Input()
  source: TableSourceService;

  @Input()
  columnMode = ColumnMode.flex;

  @Output()
  selectRow = new EventEmitter<unknown>();

  constructor() {
  }

  ngOnInit(): void {
  }

  select(event){
    this.selectRow.emit(event.selected);
  }

  /**
   * fix: ngrx-datatable does not stretch to 100% width on first init
   */
  ngAfterViewChecked() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }
}
