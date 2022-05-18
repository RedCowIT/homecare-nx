import {ErrorHandler, Injectable} from '@angular/core';
import {LoggerService} from "@homecare/core";
import * as Sentry from "@sentry/angular";
import {environment} from "../../../environments/environment";

/**
 * Handle client errors
 *
 */
@Injectable({
  providedIn: 'root'
})
export class AppErrorService extends ErrorHandler {

  constructor(private logger: LoggerService) {

    super();

  }

  handleError(err: any): void {

    try {
      console.error('ErrorService.handleError', typeof err, err);

      this.reportError('Unhandled error', err);

      // Call parent handleError method for debug
      super.handleError(err);

    } catch (e) {
      console.error('Last defence: error handling error!');
    }
  }

  private reportError(message: string, error: any) {

    try {
      this.logger.error(message, error);
    }
    catch (e){
      console.error(e);
    }

    try {
      if (environment.sentry.enabled){
        Sentry.captureException(error.originalError || error);
      }
    } catch (e) {
      console.error(e);
    }

    //
    // this.firebase.trackEvent({
    //   category: 'error',
    //   action: 'unhandled-error',
    //   label: errorString
    // });

    // this.analyticsService.error('error', 'unhandled-error', errorString);
    //
    // this.crashService.logException(errorString);

  }
}

