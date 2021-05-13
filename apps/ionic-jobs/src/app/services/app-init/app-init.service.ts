import {combineLatest, from, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppInitFactory, AppInitHandler} from '@homecare/shared';
import {filter, first, tap} from 'rxjs/operators';
import {Auth0Service} from '@homecare/auth0';
import {LoggerService, LogHandlerFactory} from "@homecare/core";
import {environment} from "../../../environments/environment";
import {Platform} from "@ionic/angular";
import {Storage} from '@ionic/storage-angular';

/**
 * Bootstraps application before any component loads
 *
 * - Init Log Handlers
 * - Init Auth
 *
 */
@Injectable({
  providedIn: 'root'
})
export class AppInitService implements AppInitHandler {

  constructor(private platform: Platform,
              private storage: Storage,
              private auth0Service: Auth0Service,
              private logger: LoggerService) {

  }

  init(): void {

    LogHandlerFactory.createLogHandlers(this.logger, environment.logHandlers);

    this.logger.debug('AppInitService.init');

    this.platform.ready().then(async () => {
      if (this.platform.is('capacitor')) {
        this.logger.debug('Capacitor ready');
      }

      this.auth0Service.init();
    });

  }


  waitUntilInitialized(): Observable<any> {

    const storage$ = from(this.storage.create());

    const authReady$ = this.auth0Service.isInitialised$.pipe(
      filter(authReady => {
        return authReady;
      })
    );

    return combineLatest([storage$, authReady$]).pipe(
      tap(([storage, authenticated]) => {

        this.logger.debug('AppInitService.initialized', {authenticated});

        if (authenticated) {
          this.authenticated();
        }
      }),
      first()
    );

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
