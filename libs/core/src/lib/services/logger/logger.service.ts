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
    try {
      if (!this.isEnabled) {
        return;
      }

      for (const handler of this.getHandlers()) {
        handler.trace(message, ...optionalParams);
      }
    } catch (e){
      // noop
    }

  }

  debug(message?: any, ...optionalParams: any[]): void {

    try {
      if (!this.isEnabled) {
        return;
      }

      for (const handler of this.getHandlers()) {
        handler.debug(message, ...optionalParams);
      }
    } catch (e){
      // noop
    }

  }

  info(message?: any, ...optionalParams: any[]): void {

    try {
      if (!this.isEnabled) {
        return;
      }

      for (const handler of this.getHandlers()) {
        handler.info(message, ...optionalParams);
      }
    } catch (e){
      // noop
    }

  }

  warn(message?: any, ...optionalParams: any[]): void {

    try {
      if (!this.isEnabled) {
        return;
      }

      for (const handler of this.getHandlers()) {
        handler.warn(message, ...optionalParams);
      }
    } catch (e){
      // noop
    }

  }

  error(message?: any, ...optionalParams: any[]): void {

    try {
      if (!this.isEnabled) {
        return;
      }

      for (const handler of this.getHandlers()) {
        handler.error(message, ...optionalParams);
      }
    } catch (e){
      // noop
    }

  }

  getHandlers(): LogHandler[] {
    return Object.values(this.handlers) as Array<LogHandler>
  }
}
