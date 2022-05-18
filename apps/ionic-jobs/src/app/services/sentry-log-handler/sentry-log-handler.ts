/**
 * Options:
 * prefix
 */
import {BaseLogHandler} from "@homecare/core";
import {environment} from "../../../environments/environment";
import * as Sentry from "@sentry/angular";

export class SentryLogHandler extends BaseLogHandler {

  protected logDebug(message?: any, ...optionalParams: any[]) {
    this.breadcrumb(Sentry.Severity.Debug, message, ...optionalParams);
  }

  protected logError(message?: any, ...optionalParams: any[]) {
    this.breadcrumb(Sentry.Severity.Error, message, ...optionalParams);
  }

  protected logInfo(message?: any, ...optionalParams: any[]) {
    this.breadcrumb(Sentry.Severity.Info, message, ...optionalParams);
  }

  protected logTrace(message?: any, ...optionalParams: any[]) {
    this.breadcrumb(Sentry.Severity.Debug, message, ...optionalParams);
  }

  protected logWarn(message?: any, ...optionalParams: any[]) {
    this.breadcrumb(Sentry.Severity.Warning, message, ...optionalParams);
  }

  protected breadcrumb(level: Sentry.Severity, message?: any, ...optionalParams: any[]) {
    try {
      if (environment.sentry.enabled) {
        Sentry.addBreadcrumb({
          category: "app-log",
          message: typeof message === 'string' ? message : '',
          data: optionalParams,
          level
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}
