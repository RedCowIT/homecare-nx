import {Logger} from "./logger";
import {LoggerService} from "./logger.service";
import {LogHandlerConfig} from "./log-handler-config";
import {LogHandler} from "./log-handler";
import {ConsoleLogHandler} from "./console-log-handler";
import {LogVerbosity} from "./log-verbosity";
import {SerializedConsoleLogHandler} from "./serialized-console-log-handler";
import {LogHandlers} from "./log-handlers";
import {StoreLogHandler} from "./store-log-handler";
import {Store} from "@ngrx/store";

export class LogHandlerFactory {
  public static createLogHandlers(store: Store,
                                  logger: LoggerService,
                                  logHandlerConfigs = new Array<LogHandlerConfig>()): Logger {

    if (!logHandlerConfigs) {
      return logger;
    }

    for (const config of logHandlerConfigs) {
      switch (config.type) {
        case LogHandlers.Console:
          logger.addLogHandler(config.key, LogHandlerFactory.createConsoleLogger(config));
          break;

        case LogHandlers.SerializedConsole:
          logger.addLogHandler(config.key, LogHandlerFactory.createSerializedConsoleLogger(config));
          break;

        case LogHandlers.Store:
          logger.addLogHandler(config.key, LogHandlerFactory.createStoreLogger(store, config));
          break;

        default:
          throw new Error(`Unsupported log handler type ${config.type}. Add custom types after creation.`);
      }
    }

    return logger;
  }

  public static createConsoleLogger(config: LogHandlerConfig): LogHandler {
    const handler = new ConsoleLogHandler();
    handler.setVerbosity(LogVerbosity[config.level]);
    handler.enable(config.enabled);

    if (config.prefix){
      handler.setPrefix(config.prefix);
    }

    return handler;
  }

  public static createSerializedConsoleLogger(config: LogHandlerConfig): LogHandler {
    const handler = new SerializedConsoleLogHandler();
    handler.setVerbosity(LogVerbosity[config.level]);
    handler.enable(config.enabled);

    if (config.prefix){
      handler.setPrefix(config.prefix);
    }

    return handler;
  }

  public static createStoreLogger(store: Store, config: LogHandlerConfig): LogHandler {

    const handler = new StoreLogHandler(store);
    handler.setVerbosity(LogVerbosity[config.level]);
    handler.enable(config.enabled);

    if (config.prefix){
      handler.setPrefix(config.prefix);
    }

    if (config.options?.logLimit){
      handler.setLogLimit(config.options.logLimit);
    }

    return handler;
  }
}
