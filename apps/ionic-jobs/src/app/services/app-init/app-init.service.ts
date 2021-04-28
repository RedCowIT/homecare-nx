import {EMPTY, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppInitFactory, AppInitHandler} from '@homecare/shared';
import {filter, first, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
//import {AccountsService, CurrentAccountService} from '@homecare/account';
import {Auth0Service} from '@homecare/auth0';
//import {CurrentUserService} from '../../../../../../libs/account/src/lib/services/current-user/current-user.service';
import {LoggerService} from "@homecare/core";
import {LogHandlerFactory} from "@homecare/core";
import {environment} from "../../../environments/environment";

/**
 * Bootstraps application before any component loads
 *
 * - Init Auth
 * - Init Current Account
 * - Prefetch accounts (if authenticated)
 *
 */
@Injectable({
  providedIn: 'root'
})
export class AppInitService implements AppInitHandler {

  constructor(private auth0Service: Auth0Service,
              private logger: LoggerService) {

  }

  init(): void {

    console.log('AppInitService.init');

    LogHandlerFactory.createLogHandlers(this.logger, environment.logHandlers);

    this.auth0Service.init();
    // this.currentAccountService.init();

  }


  waitUntilInitialized(): Observable<any> {

    // const ready$ = this.auth0Service.isInitialised$.pipe(
    //   withLatestFrom(this.currentAccountService.isInitialized$),
    //   filter(([authReady, currentAccountReady]) => {
    //     return authReady && currentAccountReady;
    //   })
    // );
    //
    // return ready$.pipe(
    //   mergeMap(() => this.auth0Service.isAuthenticated$),
    //   tap((authenticated) => {
    //     if (authenticated) {
    //       this.accountsService.getAll(); // prefetch, but don't wait for result
    //       this.currentUserService.load();
    //     }
    //   }),
    //   first()
    // );


    const ready$ = this.auth0Service.isInitialised$.pipe(
      filter(authReady => {
        return authReady;
      })
    )

    return ready$.pipe(
      mergeMap(() => this.auth0Service.isAuthenticated$),
      tap((authenticated) => {
        if (authenticated) {
          this.authenticated();
        }
      }),
      first()
    )

  }

  /**
   * User is authenticated, trigger async loads. Result is not waited on.
   */
  private authenticated() {

  }

}

export function AppInitServiceFactory(initHandler: AppInitHandler): () => void {
  return AppInitFactory.create(initHandler);
}
