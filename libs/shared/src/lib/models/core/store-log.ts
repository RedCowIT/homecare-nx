export interface StoreLog {
  id: string;
  date: string;
  message: string;
  data: unknown;
  level: 'info' | 'debug' | 'warn' | 'error' | 'trace'
}
