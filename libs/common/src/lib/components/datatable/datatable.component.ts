import {AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableSourceService} from "@homecare/common";
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import {Subject, timer} from "rxjs";
import {SubscribedContainer} from "@homecare/shared";
import {debounce, takeUntil} from "rxjs/operators";

@Component({
  selector: 'dd-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent extends SubscribedContainer implements OnInit, AfterViewInit {

  selectionType = SelectionType.single;

  @Input()
  footerHeight = 40;

  @Input()
  headerHeight:any = 'auto';

  @Input()
  rowHeight:any = 'auto';

  @Input()
  source: TableSourceService;

  @Input()
  columnMode = ColumnMode.flex;

  @Output()
  selectRow = new EventEmitter<unknown>();

  dispatchResize$ = new Subject();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.dispatchResize$.pipe(
      debounce(() => timer(1000)),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      console.log('DISPATCH RESIZE');
    });
  }

  select(event){
    this.selectRow.emit(event.selected);
  }

  /**
   * fix: ngrx-datatable does not stretch to 100% width on first init
   * TODO: circular reference error
   */
  ngAfterViewInit() {
    this.dispatchResize$.next();
    setTimeout(() => {
      this.dispatchResize$.next();
    }, 1500);
  }
}
