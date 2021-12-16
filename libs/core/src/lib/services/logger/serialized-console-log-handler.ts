import {BaseLogHandler} from "./base-log-handler";

/**
 * Options:
 * prefix
 */
export class SerializedConsoleLogHandler extends BaseLogHandler {

  protected logDebug(message?: any, ...optionalParams: any[]) {

    const serialized = this.serializeParams(optionalParams);

    if (this.prefix) {
      console.debug(this.prefix, message, serialized);
    } else {
      console.debug(message, serialized);
    }
  }

  protected logError(message?: any, ...optionalParams: any[]) {

    const serialized = this.serializeParams(optionalParams);

    if (this.prefix) {
      console.error(this.prefix, message, serialized);
    } else {
      console.error(message, serialized);
    }
  }

  protected logInfo(message?: any, ...optionalParams: any[]) {

    const serialized = this.serializeParams(optionalParams);

    if (this.prefix) {
      console.info(this.prefix, message, serialized);
    } else {
      console.info(message, serialized);
    }

  }

  protected logTrace(message?: any, ...optionalParams: any[]) {

    const serialized = this.serializeParams(optionalParams);

    if (this.prefix) {
      console.trace(this.prefix, message, serialized);
    } else {
      console.trace(message, serialized);
    }

  }

  protected logWarn(message?: any, ...optionalParams: any[]) {

    const serialized = this.serializeParams(optionalParams);

    if (this.prefix) {
      console.warn(this.prefix, message, serialized);
    } else {
      console.warn(message, serialized);
    }

  }

  protected serializeParams(...optionalParams: any[]) {
    let str = '';
    for (const param of optionalParams) {
      if (typeof param === 'string') {
        str += param + ';'
      } else if (typeof param === 'object') {
        str += JSON.stringify(param) + ';';
      }
    }
    return str;
  }
}
