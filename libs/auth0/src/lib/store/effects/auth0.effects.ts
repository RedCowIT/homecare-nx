import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {auth0Actions} from '../actions';
import {catchError, first, mergeMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {Auth0Service} from '../../services/auth0/auth0.service';
import {Auth0ClientService} from '../../services/auth0-client/auth0-client.service';
import {combineLatest, of} from 'rxjs';
import {Router} from '@angular/router';
import {State} from '../reducers';
import {initAuthError} from '../actions/auth0.actions';
import {Plugins} from '@capacitor/core';

const {Browser} = Plugins;

@Injectable()
export class Auth0Effects {

  init$ = createEffect(() => this.actions$.pipe(
    ofType(auth0Actions.initAuth),
    mergeMap(action => {

      this.auth0ClientService.init();

      if (this.auth0Service.isCallback()) {

        return of(auth0Actions.handleAuthCallback({}));

      } else {

        return combineLatest([
          this.auth0ClientService.isAuthenticated().pipe(tap((auth) => {

          })),
          this.auth0ClientService.getToken().pipe(tap((token) => {

          }))
        ]).pipe(
          mergeMap(([authenticated, token]) => {

            return of(
              auth0Actions.setAuth({isAuthenticated: authenticated, token}),
              auth0Actions.initAuthSuccess()
            );
          })
        );


      }

    })
  ));

  handleAuthCallback$ = createEffect(() => this.actions$.pipe(
    ofType(auth0Actions.handleAuthCallback),
    mergeMap(action => {

      return this.auth0ClientService.handleCallback(action.url).pipe(
        mergeMap(targetPath => {

          return combineLatest([
            of(targetPath),
            this.auth0ClientService.isAuthenticated(),
            this.auth0ClientService.getToken()
          ]);

        }),
        mergeMap(([targetPath, authenticated, token]) => {

          // TODO: if !authenticated, we're still calling redirectOnAuth
          return of(
            auth0Actions.setAuth({
              isAuthenticated: authenticated,
              token
            }),
            auth0Actions.initAuthSuccess(),
            auth0Actions.redirectOnAuth({targetPath})
          );
        }),
        catchError(error => {
          return of(initAuthError({error})); // TODO: return generic fatal error too
        })
      );

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
      this.auth0ClientService.getAuthorizationUrl(action.targetPath).pipe(
        first()
      ).subscribe(async url => {

        // window.location.href = url;

        // window.location.href = url;
        // window.open(url, '_system');
        await Browser.open({url: url});
      });

      // this.auth0ClientService.login(action.targetPath);

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

}
