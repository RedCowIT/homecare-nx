import {BaseLogHandler} from "./base-log-handler";
import {Store} from "@ngrx/store";
import {logToStore, setLogToStoreLimit} from "../../store/actions/store-logger.actions";

/**
 * Writes log messages to NgRx store.
 *
 *
 * Options:
 * prefix
 */
export class StoreLogHandler extends BaseLogHandler {

  constructor(protected store: Store) {
    super();
  }

  setLogLimit(logLimit: number) {
    this.store.dispatch(setLogToStoreLimit({logLimit}))
  }

  protected logDebug(message?: any, ...optionalParams: any[]) {
    this.store.dispatch(logToStore({level: 'debug', message, data: optionalParams}))
  }

  protected logError(message?: any, ...optionalParams: any[]) {
    this.store.dispatch(logToStore({level: 'error', message, data: optionalParams}))
  }

  protected logInfo(message?: any, ...optionalParams: any[]) {
    this.store.dispatch(logToStore({level: 'info', message, data: optionalParams}))
  }

  protected logTrace(message?: any, ...optionalParams: any[]) {
    this.store.dispatch(logToStore({level: 'trace', message, data: optionalParams}))
  }

  protected logWarn(message?: any, ...optionalParams: any[]) {
    this.store.dispatch(logToStore({level: 'warn', message, data: optionalParams}))
  }
}
