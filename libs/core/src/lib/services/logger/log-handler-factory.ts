import {Logger} from "./logger";
import {LoggerService} from "./logger.service";
import {LogHandlerConfig} from "./log-handler-config";
import {LogHandler} from "./log-handler";
import {ConsoleLogHandler} from "./console-log-handler";
import {LogVerbosity} from "./log-verbosity";

export class LogHandlerFactory {
  public static createLogHandlers(logger: LoggerService,
                                  logHandlerConfigs = new Array<LogHandlerConfig>()): Logger {

    if (!logHandlerConfigs) {
      return logger;
    }

    for (const config of logHandlerConfigs) {
      switch (config.type) {
        case 'console':
          logger.addLogHandler(config.key, LogHandlerFactory.createConsoleLogger(config));
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

    console.log('createConsoleLogger', config);
    if (config.prefix){
      handler.setPrefix(config.prefix);
    }

    return handler;
  }
}
