import {assertTrue} from "../../support/assert";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateService {
  readonly months = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ];

  public yearsArray(fromYears: number, toYears: number = 0): number[] {
    const nowYear = new Date().getFullYear();
    const from = nowYear - fromYears;
    const to = nowYear + toYears;

    assertTrue(to >= from, 'Cannot create years array, to < from');

    const years = [];

    for (let year = from; year <= to; year++) {
      years.push(year);
    }

    return years;
  }
}
