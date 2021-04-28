import {BaseLogHandler} from "./base-log-handler";

/**
 * Options:
 * prefix
 */
export class ConsoleLogHandler extends BaseLogHandler {

  protected logDebug(message?: any, ...optionalParams: any[]) {
    if (this.prefix) {
      console.debug(this.prefix, message, ...optionalParams);
    } else {
      console.debug(message, ...optionalParams);
    }
  }

  protected logError(message?: any, ...optionalParams: any[]) {
    if (this.prefix) {
      console.error(this.prefix, message, ...optionalParams);
    } else {
      console.error(message, ...optionalParams);
    }
  }

  protected logInfo(message?: any, ...optionalParams: any[]) {
    if (this.prefix) {
      console.info(this.prefix, message, ...optionalParams);
    } else {
      console.info(message, ...optionalParams);
    }
  }

  protected logTrace(message?: any, ...optionalParams: any[]) {
    if (this.prefix) {
      console.trace(this.prefix, message, ...optionalParams);
    } else {
      console.trace(message, ...optionalParams);
    }
  }

  protected logWarn(message?: any, ...optionalParams: any[]) {
    if (this.prefix) {
      console.warn(this.prefix, message, ...optionalParams);
    } else {
      console.warn(message, ...optionalParams);
    }
  }
}
