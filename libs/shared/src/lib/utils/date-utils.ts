import * as moment from 'moment';
import {Moment} from "moment";

export function millisFromNow(date: string | moment.Moment): number {

  if (typeof date === 'string') {
    date = moment(date);
  }

  return date.diff(moment(), 'milliseconds');
}

export function displayTime(millisec: number): string {
  if (millisec === undefined) {
    return '0';
  }

  const normalizeTime = (time: string): string => (time.length === 1) ? time.padStart(2, '0') : time;

  let seconds: string = (millisec / 1000).toFixed(0);
  let minutes: string = Math.floor(parseInt(seconds, 10) / 60).toString();
  let hours = '';

  if (parseInt(minutes, 10) > 59) {
    hours = normalizeTime(Math.floor(parseInt(minutes, 10) / 60).toString());
    minutes = normalizeTime((parseInt(minutes, 10) - (parseInt(hours, 10) * 60)).toString());
  }
  seconds = normalizeTime(Math.floor(parseInt(seconds, 10) % 60).toString());

  if (hours !== '') {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

export function nowAsDateString(): string {
  return moment().format('YYYY-MM-DD');
}

export function asDateString(moment: Moment): string {
  return moment.format('YYYY-MM-DD');
}
