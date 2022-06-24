import {Injectable} from '@angular/core';
import {State} from '../../store/reducers';
import {select, Store} from '@ngrx/store';
import {auth0Actions} from '../../store/actions';
import {getToken, isAuthenticated, isInitialized} from '../../store/selectors/auth0.selectors';

/**
 * Auth0 Facade Service
 */
@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  readonly isInitialised$ = this.store.pipe(select(isInitialized));

  readonly isAuthenticated$ = this.store.pipe(select(isAuthenticated));

  readonly token$ = this.store.pipe(select(getToken));

  constructor(private store: Store<State>) {
  }

  /**
   * To handle Auth0 callbacks, init must be called before any routing redirection
   */
  init(): void {
    this.store.dispatch(auth0Actions.initAuth());
  }

  login(targetPath = '/'): void {
    this.store.dispatch(auth0Actions.login({targetPath}));
  }

  logout(targetPath = '/'): void {
    this.store.dispatch(auth0Actions.logout({targetPath}));
  }

  handleCallback(url?: string) {
    this.store.dispatch(auth0Actions.handleAuthCallback({
      url
    }));
  }

  isCallback(url?: string) {
    if (url){
      return this.containsCallbackParams(new URL(url).search);
    } else {
      return this.containsCallbackParams(window.location.search);
    }
  }

  containsCallbackParams(queryStr: string){
    return queryStr.includes('code=') && queryStr.includes('state=');
  }
}
