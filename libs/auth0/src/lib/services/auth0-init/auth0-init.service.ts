import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {AppInitFactory, AppInitHandler} from '@homecare/shared';
import {isInitialized} from '../../store/selectors/auth0.selectors';
import {filter, take} from 'rxjs/operators';
import {Auth0Service} from '../auth0/auth0.service';

@Injectable({
  providedIn: 'root'
})
export class Auth0InitService implements AppInitHandler {

  constructor(private store: Store, private auth0Service: Auth0Service) {

  }

  init(): void {

    this.auth0Service.init();

  }

  waitUntilInitialized(): Observable<any> {

    // select and filter

    return this.store.select(isInitialized)
      .pipe(
        filter(initialized => initialized === true),
        take(1));
  }

}

export function Auth0InitServiceFactory(initHandler: AppInitHandler): () => void {
  return AppInitFactory.create(initHandler);
}
