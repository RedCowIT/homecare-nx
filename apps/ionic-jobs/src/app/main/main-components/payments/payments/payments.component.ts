import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {DateRange, dateRangeToQuery} from "@homecare/common";

@Component({
  selector: 'hc-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  defaultDateRange = {
    startDate: moment().subtract(6, 'days').startOf('day'),
    endDate: moment().endOf('day')
  };

  dateQuery: {startDate: string, endDate: string};

  constructor() { }

  ngOnInit(): void {
  }

  dateChange(dateRange: DateRange){
    this.dateQuery = dateRangeToQuery(dateRange);
  }

}
