import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getLoginError, getToken, isAuthenticated, isInitialized, isLoggingIn} from "../store/selectors/auth.selectors";
import {authActions} from "../store/actions";
import {State} from "../store/reducers";

/**
 * Token Auth Facade Service
 */
@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {

  readonly isInitialised$ = this.store.pipe(select(isInitialized));

  readonly isAuthenticated$ = this.store.pipe(select(isAuthenticated));

  readonly token$ = this.store.pipe(select(getToken));

  readonly isLoggingIn$ = this.store.pipe(select(isLoggingIn));

  readonly loginError$ = this.store.pipe(select(getLoginError))

  constructor(private store: Store<State>) {
  }

  /**
   * To handle Auth0 callbacks, init must be called before any routing redirection
   */
  init(): void {
    this.store.dispatch(authActions.initAuth());
  }

  login(username: string, password: string): void {
    this.store.dispatch(authActions.login({username, password}));
  }

  logout(targetPath = '/'): void {
    this.store.dispatch(authActions.logout({targetPath}));
  }
}
