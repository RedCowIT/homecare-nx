import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {DateRange, dateRangeToQuery} from "@homecare/common";

@Component({
  selector: 'hc-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  defaultDateRange = {
    startDate: moment().subtract(6, 'days').startOf('day'),
    endDate: moment().endOf('day')
  };

  dateQuery: {startDate: string, endDate: string};

  constructor() { }

  ngOnInit(): void {
  }

  dateChange(dateRange: DateRange){
    console.log('dateChange', dateRange);
    this.dateQuery = dateRangeToQuery(dateRange);
  }

}
