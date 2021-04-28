import {LogHandler} from "./log-handler";

export abstract class Logger {

  abstract addLogHandler(key: string, logHandler: LogHandler);

  abstract removeLogHandler(key: string);

  abstract enable(isEnabled: boolean): void;

  abstract trace(message?: any, ...optionalParams: any[]): void;

  abstract debug(message?: any, ...optionalParams: any[]): void;

  abstract info(message?: any, ...optionalParams: any[]): void;

  abstract warn(message?: any, ...optionalParams: any[]): void;

  abstract error(message?: any, ...optionalParams: any[]): void;
}
