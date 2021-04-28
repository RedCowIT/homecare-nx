import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {auth0Actions} from '../actions';
import {catchError, mergeMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {Auth0Service} from '../../services/auth0/auth0.service';
import {Auth0ClientService} from '../../services/auth0-client/auth0-client.service';
import {combineLatest, of} from 'rxjs';
import {Router} from '@angular/router';
import {State} from '../reducers';
import {initAuthError} from '../actions/auth0.actions';


@Injectable()
export class Auth0Effects {

  init$ = createEffect(() => this.actions$.pipe(
    ofType(auth0Actions.initAuth),
    mergeMap(action => {

      this.auth0ClientService.init();

      if (this.isCallback()) {

        return this.auth0ClientService.handleCallback().pipe(
          mergeMap(targetPath => {

            return combineLatest([
              of(targetPath),
              this.auth0ClientService.isAuthenticated(),
              this.auth0ClientService.getToken()
            ]);

          }),
          mergeMap(([targetPath, authenticated, token]) => {

            return of(auth0Actions.initAuthSuccess({
              isAuthenticated: authenticated,
              token
            }), auth0Actions.redirectOnAuth({targetPath}));
          }),
          catchError(error => {
            return of(initAuthError({error})); // TODO: return generic fatal error too
          })
        );

      } else {

        return combineLatest([
          this.auth0ClientService.isAuthenticated(),
          this.auth0ClientService.getToken()
        ]).pipe(
          mergeMap(([authenticated, token]) => {
            return of(auth0Actions.initAuthSuccess({isAuthenticated: authenticated, token}));
          })
        );

      }

    })
  ));

  redirectOnAuth$ = createEffect(() => this.actions$.pipe(
    ofType(auth0Actions.redirectOnAuth),
    tap(action => {

      this.router.navigateByUrl(action.targetPath);

    })
  ), {dispatch: false});

  login$ = createEffect(() => this.actions$.pipe(
    ofType(auth0Actions.login),
    tap(action => {
      this.auth0ClientService.login(action.targetPath);
    })
  ), {dispatch: false});

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(auth0Actions.logout),
    tap(action => {
      this.auth0ClientService.logout();
    })
  ), {dispatch: false});

  constructor(private router: Router,
              private actions$: Actions,
              private store$: Store<State>,
              private auth0Service: Auth0Service,
              private auth0ClientService: Auth0ClientService) {
  }

  private isCallback() {
    const params = window.location.search;
    return params.includes('code=') && params.includes('state=');
  }

}
