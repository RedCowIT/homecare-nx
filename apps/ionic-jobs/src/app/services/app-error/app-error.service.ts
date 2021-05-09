import {ErrorHandler, Injectable} from '@angular/core';
import {LoggerService} from "@homecare/core";

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

    this.logger.error('Unhandled error', err);

    // try {
    //   console.error('ErrorService.handleError', typeof err, err);
    //
    //   this.reportError('Unhandled error', err);
    //
    //   // Call parent handleError method for debug
    //   super.handleError(err);
    //
    // } catch (e) {
    //   console.error('Last defence: error handling error!');
    // }
  }

  private reportError(message: string, data: any) {

    // const errorString = ErrorUtils.errorMessage(message, data);
    //
    // this.logger.error(errorString, data);
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

