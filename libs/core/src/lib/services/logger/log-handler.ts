import {LogVerbosity} from "./log-verbosity";

export interface LogHandler {
  enable(isEnabled: boolean): void;

  setVerbosity(verbosity: LogVerbosity);

  getVerbosity(): LogVerbosity;

  trace(message?: any, ...optionalParams: any[]): void;

  debug(message?: any, ...optionalParams: any[]): void;

  info(message?: any, ...optionalParams: any[]): void;

  warn(message?: any, ...optionalParams: any[]): void;

  error(message?: any, ...optionalParams: any[]): void;
}
