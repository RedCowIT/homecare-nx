import {LogVerbosity} from "./log-verbosity";
import {LogHandler} from "./log-handler";

/**
 * Base log handler
 * Manages verbosity checks and delegates to abstract implementation
 */
export abstract class BaseLogHandler implements LogHandler {

  protected _isEnabled: boolean;
  protected verbosity: LogVerbosity;
  protected prefix: string;

  enable(isEnabled: boolean): void {
    this._isEnabled = isEnabled;
  }

  get isEnabled(): boolean {
    return this._isEnabled;
  }

  setVerbosity(verbosity: LogVerbosity) {
    this.verbosity = verbosity;
  }

  getVerbosity(): LogVerbosity {
    return this.verbosity;
  }

  getPrefix(): string {
    return this.prefix;
  }

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  trace(message?: any, ...optionalParams: any[]) {
    if (this._isEnabled && this.verbosity <= LogVerbosity.trace) {
      this.logTrace(message, ...optionalParams);
    }
  }

  debug(message?: any, ...optionalParams: any[]) {
    if (this._isEnabled && this.verbosity <= LogVerbosity.debug) {
      this.logDebug(message, ...optionalParams);
    }
  }

  info(message?: any, ...optionalParams: any[]) {
    if (this._isEnabled && this.verbosity <= LogVerbosity.info) {
      this.logInfo(message, ...optionalParams);
    }
  }

  warn(message?: any, ...optionalParams: any[]) {
    if (this._isEnabled && this.verbosity <= LogVerbosity.warn) {
      this.logWarn(message, ...optionalParams);
    }
  }

  error(message?: any, ...optionalParams: any[]) {
    if (this._isEnabled && this.verbosity <= LogVerbosity.error) {
      this.logError(message, ...optionalParams);
    }
  }

  protected abstract logTrace(message?: any, ...optionalParams: any[]);

  protected abstract logDebug(message?: any, ...optionalParams: any[]);

  protected abstract logInfo(message?: any, ...optionalParams: any[]);

  protected abstract logWarn(message?: any, ...optionalParams: any[]);

  protected abstract logError(message?: any, ...optionalParams: any[]);

}
