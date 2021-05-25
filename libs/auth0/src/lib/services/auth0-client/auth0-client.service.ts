import {Inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Auth0Config} from '../../models/auth0-config';
import {BehaviorSubject, defer, EMPTY, from, Observable, of, throwError} from 'rxjs';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import {catchError, concatMap, map, mergeMap, shareReplay, switchMap, tap} from 'rxjs/operators';
import {Auth0CallbackParams} from '../../models/auth0-callback-params';
import {State} from '../../store/reducers';
import {AUTH0_CONFIG} from '../../tokens/auth0.config';
import {CacheKey} from "@auth0/auth0-spa-js/src/cache";
import {environment} from "../../../../../../apps/ionic-jobs/src/environments/environment";

/**
 * Ng Service wrapper for {@link https://auth0.com/docs/libraries/auth0-spa-js|auth0-spa-js}
 *
 * Interacts with Store<{@link Auth0State}>
 */
@Injectable({
  providedIn: 'root'
})
export class Auth0ClientService {

  // Create an observable of Auth0 instance of client
  private auth0Client$;

  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  private isAuthenticated$;

  private isInitialised;

  private redirectUri: string;

  private userProfileSubject$ = new BehaviorSubject<any>(null);

  userProfile$ = this.userProfileSubject$.asObservable();

  constructor(@Inject(AUTH0_CONFIG) private authConfig, private store: Store<State>) {

  }

  init() {

    if (this.isInitialised) {
      throw new Error('Attempted to reinitialise Auth0Service');
    }

    this.redirectUri = this.authConfig.aredirectUri;

    this.auth0Client$ = (from(
      createAuth0Client({
        domain: this.authConfig.domain,
        client_id: this.authConfig.clientId,
        redirect_uri: this.authConfig.redirectUri,
        audience: this.authConfig.audience
      })
    ) as Observable<Auth0Client>).pipe(
      tap(client => {
        // console.log('created auth0client', client);
      }),
      shareReplay(1), // Every subscription receives the same shared value
      catchError(err => throwError(err))
    )
    ;

    this.isAuthenticated$ = this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.isAuthenticated()))
    );

    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();

    this.isInitialised = true;
  }

  handleCallback(url?: string): Observable<string> {

    // console.log('auth0clientService.handleCallback', url);

    return this.auth0Client$.pipe(
      mergeMap((client: Auth0Client) => {

        return from(client.handleRedirectCallback(url));

      }),
      map((cbRes: any) => {
        console.log('handled callback', cbRes);
        return cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  login(targetPath = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists

    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: this.redirectUri,
        appState: {target: targetPath}
      });
    });
  }

  getAuthorizationUrl(targetPath = '/'): Observable<string> {
    return this.auth0Client$.pipe(
      mergeMap((client: Auth0Client) => {

        // Test
        return from(client.buildAuthorizeUrl({
          redirect_uri: environment.auth.redirectUri,
          appState: {target: targetPath}
        }));
      })
    )
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {

      // Call method to log out
      client.logout({
        client_id: this.authConfig.clientId,
        returnTo: this.authConfig.logoutUri,
        localOnly: false
      });

    });
  }


  getToken(): Observable<string> {


    return this.auth0Client$.pipe(
      mergeMap((client: Auth0Client) => {
        return from(client.getTokenSilently());
      }),
      catchError(err => {
        // console.log('getToken err', err);
        return of('');
      })
    );

    /*

    return this.auth0Client$.pipe(
      mergeMap((client: Auth0Client) => {
        return from(client.getTokenSilently());
      }),
      catchError(err => {
        console.log('getToken err', err);
        return of('');
      })
    );

     */
  }

  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }
}
