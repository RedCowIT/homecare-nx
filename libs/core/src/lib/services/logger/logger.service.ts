import {Injectable} from "@angular/core";
import {Logger} from "./logger";
import {LogHandler} from "./log-handler";

@Injectable({
  providedIn: 'root'
})
export class LoggerService extends Logger {

  private isEnabled = true;
  private handlers = <{ key: string, logHandler: LogHandler }>{};

  constructor() {
    super();
  }

  addLogHandler(key: string, logHandler: LogHandler) {
    this.handlers[key] = logHandler;
  }

  removeLogHandler(key: string) {
    delete this.handlers[key];
  }

  enable(isEnabled: boolean): void {
    this.isEnabled = isEnabled;
  }

  trace(message?: any, ...optionalParams: any[]): void {
    if (!this.isEnabled) {
      return;
    }

    for (const handler of this.getHandlers()) {
      handler.trace(message, ...optionalParams);
    }
  }

  debug(message?: any, ...optionalParams: any[]): void {
    if (!this.isEnabled) {
      return;
    }

    for (const handler of this.getHandlers()) {
      handler.debug(message, ...optionalParams);
    }
  }

  info(message?: any, ...optionalParams: any[]): void {

    if (!this.isEnabled) {
      return;
    }

    for (const handler of this.getHandlers()) {
      handler.info(message, ...optionalParams);
    }
  }

  warn(message?: any, ...optionalParams: any[]): void {
    if (!this.isEnabled) {
      return;
    }

    for (const handler of this.getHandlers()) {
      handler.warn(message, ...optionalParams);
    }
  }

  error(message?: any, ...optionalParams: any[]): void {
    if (!this.isEnabled) {
      return;
    }

    for (const handler of this.getHandlers()) {
      handler.error(message, ...optionalParams);
    }
  }

  getHandlers(): LogHandler[] {
    return Object.values(this.handlers) as Array<LogHandler>
  }
}
