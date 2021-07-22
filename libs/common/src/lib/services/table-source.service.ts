import {Observable} from "rxjs";

export class TableSourceService {

  public columns = <unknown>[];

  public rows$ = new Observable<Array<unknown>>();
}
