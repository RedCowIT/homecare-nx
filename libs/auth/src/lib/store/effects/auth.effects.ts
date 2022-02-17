import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {combineLatest, of} from "rxjs";
import {authActions} from "../actions";
import {TokenAuthService} from "../../services/token-auth.service";
import {TokenLoginService} from "../../services/token-login.service";
import {loginError} from "../actions/auth.actions";
import {Router} from "@angular/router";


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
            authActions.setAuth({isAuthenticated: true, token}),
            authActions.initAuthSuccess(),
            authActions.loginSuccess()
          );
        }),
        catchError(error => {
          return of(loginError(error));
        })
      );

    })
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.loginSuccess),
    map(action => {

      console.log('Login success');
      return this.router.navigateByUrl('/');

    })
  ), {dispatch: false});

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.logout),
    map(async action => {

      this.loginService.logout();

      await this.router.navigateByUrl('/login');

    })
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private authService: TokenAuthService,
              private loginService: TokenLoginService,
              private router: Router) {
  }

}
