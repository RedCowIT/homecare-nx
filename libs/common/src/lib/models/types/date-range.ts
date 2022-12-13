import {Moment} from "moment";
import * as moment from "moment";

export interface DateRange {
  startDate: Moment;
  endDate: Moment;
}

export enum DateRangeLabel {
  Today = 'Today',
  Yesterday = 'Yesterday',
  Last7Days = 'Last 7 Days',
  Last30Days = 'Last 30 Days',
  ThisMonth = 'This Month',
  LastMonth = 'Last Month'
}

export function commonDateRanges() {
  return {
    [DateRangeLabel.Today]: [moment().startOf('day'), moment().endOf('day')],
    [DateRangeLabel.Yesterday]: [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
    [DateRangeLabel.Last7Days]: [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
    [DateRangeLabel.Last30Days]: [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
    [DateRangeLabel.ThisMonth]: [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
    [DateRangeLabel.LastMonth]: [moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').endOf('day')]
  }
}

export function commonDateRange(label: DateRangeLabel) {
  const ranges = commonDateRanges();
  return ranges[label];
}

export function dateRangeLabel(dateRange: DateRange) {

  const common = commonDateRanges();

  if (areDateRangesEqual(toDateRange(common[DateRangeLabel.Today][0], common[DateRangeLabel.Today][1]), dateRange)) {
    return DateRangeLabel.Today;
  }
  if (areDateRangesEqual(toDateRange(common[DateRangeLabel.Yesterday][0], common[DateRangeLabel.Yesterday][1]), dateRange)) {
    return DateRangeLabel.Yesterday;
  }
  if (areDateRangesEqual(toDateRange(common[DateRangeLabel.Last7Days][0], common[DateRangeLabel.Last7Days][1]), dateRange)) {
    return DateRangeLabel.Last7Days;
  }
  if (areDateRangesEqual(toDateRange(common[DateRangeLabel.Last30Days][0], common[DateRangeLabel.Last30Days][1]), dateRange)) {
    return DateRangeLabel.Last30Days;
  }
  if (areDateRangesEqual(toDateRange(common[DateRangeLabel.ThisMonth][0], common[DateRangeLabel.ThisMonth][1]), dateRange)) {
    return DateRangeLabel.ThisMonth;
  }
  if (areDateRangesEqual(toDateRange(common[DateRangeLabel.LastMonth][0], common[DateRangeLabel.LastMonth][1]), dateRange)) {
    return DateRangeLabel.LastMonth;
  }

  return 'Custom';

}

export function dateRangeToQuery(dateRange: DateRange) {
  return {
    startDate: dateRange.startDate.format('YYYY-MM-DD'),
    endDate: dateRange.endDate.format('YYYY-MM-DD')
  };
}

export function toDateRange(startDate: string | Moment, endDate: string | Moment): DateRange {

  if (typeof startDate === 'string' && typeof endDate === 'string') {
    return {
      startDate: moment(startDate),
      endDate: moment(endDate)
    }
  }

  return {
    startDate, endDate
  } as DateRange;
}

export function areDateRangesEqual(a: DateRange, b: DateRange) {
  return a.startDate.startOf('day').format('YYYY-MM-DD') == b.startDate.startOf('day').format('YYYY-MM-DD') &&
    a.endDate.startOf('day').format('YYYY-MM-DD') == b.endDate.startOf('day').format('YYYY-MM-DD');
}

export function withinDateRange(date: string | Moment, range: DateRange): boolean {

  if (typeof date === 'string') {
    date = moment(date);
  }

  console.log('withinDateRange', date, range);

  if (!date.isSameOrAfter(range.startDate, 'day')){
    return false;
  }

  if (!date.isSameOrBefore(range.endDate, 'day')){
    return false;
  }

  return true;
}
