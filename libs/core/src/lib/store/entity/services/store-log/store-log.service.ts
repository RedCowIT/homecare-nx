import {Injectable} from '@angular/core';
import {StoreLog} from "@homecare/shared";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {getStoreLogs} from "../../../selectors/store-log.selectors";
import {map} from "rxjs/operators";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class StoreLogService {

  readonly entities$: Observable<StoreLog[]>;

  constructor(protected store: Store) {
    this.entities$ = this.store.select(getStoreLogs).pipe(
      map(storeLogs => storeLogs.sort((a, b) => {
        return moment(b.date).diff(moment(a.date), "milliseconds");
      })
    ));
  }



}
