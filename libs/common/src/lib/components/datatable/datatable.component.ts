import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {TableSourceService} from "@homecare/common";
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import {Subject, timer} from "rxjs";
import {SubscribedContainer} from "@homecare/shared";
import {debounce, takeUntil} from "rxjs/operators";
import {DatatableComponent as NgDatatableComponent} from "@swimlane/ngx-datatable";

@Component({
  selector: 'dd-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent extends SubscribedContainer implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('tableWrapper') tableWrapper;
  @ViewChild('dataTable') table: NgDatatableComponent;

  private currentComponentWidth;

  selectionType = SelectionType.single;

  @Input()
  footerHeight = 40;

  @Input()
  headerHeight: any = 'auto';

  @Input()
  rowHeight: any = 'auto';

  @Input()
  source: TableSourceService;

  @Input()
  columnMode = ColumnMode.flex;

  @Output()
  selectRow = new EventEmitter<unknown>();

  dispatchResize$ = new Subject();

  constructor(public cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {

    console.log('Datatable.onInit');

    this.dispatchResize$.pipe(
      debounce(() => timer(500)),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      try {
        window.dispatchEvent(new Event('resize'));
      } catch (e) {

      }
    });

  }

  select(event) {
    this.selectRow.emit(event.selected);
  }

  /**
   * fix: ngrx-datatable does not stretch to 100% width on first init
   * TODO: circular reference error
   */
  ngAfterViewInit() {
    this.dispatchResize$.next();
  }

  ngAfterViewChecked() {
    // Check if the table size has changed,
    if (this.table && this.table.recalculate && (this.tableWrapper.nativeElement.clientWidth !== this.currentComponentWidth)) {
      this.currentComponentWidth = this.tableWrapper.nativeElement.clientWidth;
      this.table.recalculate();
      this.cdRef.detectChanges();
    }
  }


}
