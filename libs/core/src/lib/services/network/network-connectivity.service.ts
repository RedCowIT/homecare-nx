import {Injectable} from '@angular/core';
import {Observable, fromEvent, merge, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class NetworkConnectivityService {

  public isOnline$: Observable<boolean>;

  constructor() {

    this.initConnectivityMonitoring();

  }

  private initConnectivityMonitoring() {

    if (!window || !navigator || !('onLine' in navigator)){
      throw new Error('Network connectivity service could not find window or navigator');
    }

    this.isOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine))

  }

}
