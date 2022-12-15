import {ErrorHandler, Injectable} from '@angular/core';
import {LoggerService} from "@homecare/core";
import * as Sentry from "@sentry/angular";
import {environment} from "../../../environments/environment";
import {DataServiceError} from "@ngrx/data";

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

      if (err && err instanceof DataServiceError){
        // data service errors are handled in app-data-error.service
        return;
      }

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

