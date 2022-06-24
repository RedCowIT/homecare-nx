import {combineLatest, from, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppInitFactory, AppInitHandler} from '@homecare/shared';
import {filter, first, tap} from 'rxjs/operators';
import {LoggerService, LogHandlerFactory} from "@homecare/core";
import {environment} from "../../../environments/environment";
import {Platform} from "@ionic/angular";
import {Storage} from '@ionic/storage-angular';
import {Store} from "@ngrx/store";
import {TokenAuthService} from "@homecare-nx/auth";
import {SentryLogHandler} from "../sentry-log-handler/sentry-log-handler";

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

  private storage$: Observable<Storage>;

  constructor(private platform: Platform,
              private storage: Storage,
              private authService: TokenAuthService,
              private logger: LoggerService,
              private store: Store) {

    this.storage$ = from(this.storage.create());

  }

  init(): void {

    LogHandlerFactory.createLogHandlers(this.store, this.logger, environment.logHandlers);

    if (environment.sentry.enabled){
      this.logger.addLogHandler('sentry', new SentryLogHandler());
    }

    this.logger.debug('AppInitService.init');

    combineLatest([this.storage$, of(this.platform.ready())]).pipe(
      first()
    ).subscribe(([storage, platformReady]) => {

      if (this.platform.is('capacitor')){

      }

      this.authService.init();

    })
    //
    // this.platform.ready().then(async () => {
    //
    //   if (this.platform.is('capacitor')) {
    //     this.logger.debug('Capacitor ready');
    //   }
    //
    //
    //
    //   // this.authService.init();
    // });

  }


  waitUntilInitialized(): Observable<any> {


    const authReady$ = this.authService.isInitialised$.pipe(
      filter(authReady => {
        return authReady;
      })
    );

    return combineLatest([this.storage$, authReady$]).pipe(
      tap(([storage, authReady]) => {

        // this.logger.debug('AppInitService.initialized', {authenticated});
        //
        // if (authenticated) {
        //   this.authenticated();
        // } else {
        //   this.unauthenticated();
        // }

        return authReady;
      }),
      first()
    );

  }

  /**
   * User is authenticated, trigger async loads. Result is not waited on.
   */
  private authenticated() {

  }

  private unauthenticated(){

  }

}

export function AppInitServiceFactory(initHandler: AppInitHandler): () => void {
  return AppInitFactory.create(initHandler);
}
