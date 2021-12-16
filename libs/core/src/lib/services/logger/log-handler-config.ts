export interface LogHandlerConfig {
  type: string;
  key: string;
  level: string;
  enabled: boolean;
  prefix?: string;
  options?: any;
}
