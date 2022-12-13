import { Component, OnInit } from '@angular/core';
import {DateRange, dateRangeToQuery} from "@homecare/common";
import * as moment from "moment";

@Component({
  selector: 'hc-appointment-summary',
  templateUrl: './appointment-summary.component.html',
  styleUrls: ['./appointment-summary.component.scss']
})
export class AppointmentSummaryComponent implements OnInit {

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
