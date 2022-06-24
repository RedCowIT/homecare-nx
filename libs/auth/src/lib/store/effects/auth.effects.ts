import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {combineLatest, of} from "rxjs";
import {authActions} from "../actions";
import {TokenAuthService} from "../../services/token-auth.service";
import {TokenLoginService} from "../../services/token-login.service";
import {initAuthError, loginError} from "../actions/auth.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {LoggerService} from "@homecare/core";
import {lastItem} from "@homecare/shared";


@Injectable()
export class AuthEffects {

  init$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.initAuth),
    mergeMap(action => {

      return combineLatest([
        this.loginService.isAuthenticated$,
        this.loginService.token$
      ]).pipe(
        mergeMap(([authenticated, token]) => {
          return of(
            authActions.setAuth({isAuthenticated: authenticated, token}),
            authActions.initAuthSuccess()
          );
        }),
        catchError(error => {
          this.logger.error('Failed to initAuth', error);
          return of(
            initAuthError({error}),
            authActions.logout({targetPath: '/'})
          );
        })
      );

    })
  ));

  login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.login),
    mergeMap(action => {

      return this.loginService.login(action.username, action.password).pipe(
        mergeMap(token => {
          return of(
            authActions.setAuth({isAuthenticated: true, username: action.username, token}),
            authActions.initAuthSuccess(),
            authActions.loginSuccess()
          );
        }),
        catchError(error => {
          return of(loginError({error}));
        })
      );

    })
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.loginSuccess),
    map(action => {

      return this.router.navigateByUrl('/');

    })
  ), {dispatch: false});

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.logout),
    map(async action => {

      try {
        this.loginService.logout();
      } catch (e) {
        this.logger.error('Error handling logout', e);
      }



      await this.router.navigateByUrl('/login');

    })
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private authService: TokenAuthService,
              private loginService: TokenLoginService,
              private logger: LoggerService,
              private router: Router,
              private route: ActivatedRoute) {
  }

}
