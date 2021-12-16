import {createAction, props} from '@ngrx/store';

export const setLogToStoreLimit = createAction(
  '[StoreLogger] Set Log Limit',
  props<{ logLimit: number; }>()
);

export const logToStore = createAction(
  '[StoreLogger] Log',
  props<{ level: 'info' | 'debug' | 'warn' | 'error' | 'trace', message: string; data: unknown; }>()
);

export const logToStoreSuccess = createAction(
  '[StoreLogger] Log Success'
);
