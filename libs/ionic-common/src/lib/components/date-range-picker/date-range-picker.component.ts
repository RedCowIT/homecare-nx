import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import * as moment from "moment";
import {commonDateRanges, DateRange} from "@homecare/common";

@Component({
  selector: 'dd-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {

  @Input()
  public defaultDateRange: DateRange

  @Input()
  ranges: any = commonDateRanges();

  public dateRange?: DateRange;

  @Output()
  valueChange = new EventEmitter<DateRange>();

  constructor() {

    // last 7 days
    this.defaultDateRange = {
      startDate: moment().subtract(6, 'days').startOf('day'),
      endDate: moment().endOf('day')
    };

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dateRange = {...this.defaultDateRange};
  }

  dateChange() {
    this.valueChange.emit(this.dateRange);
  }
}
