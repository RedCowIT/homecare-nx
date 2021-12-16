import {Action, createFeatureSelector, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {guid, StoreLog} from "@homecare/shared";
import {logToStore, logToStoreSuccess, setLogToStoreLimit} from "../actions/store-logger.actions";

export const FEATURE_KEY = 'storeLog';

const DEFAULT_LOG_LIMIT = 100;

export interface StoreLogState extends EntityState<StoreLog> {
  logLimit: number;
}

export const adapter = createEntityAdapter<StoreLog>({});

export const initialState: StoreLogState = adapter.getInitialState({
  logLimit: DEFAULT_LOG_LIMIT
});

function createLog(level: 'info' | 'debug' | 'warn' | 'error' | 'trace', message: string, data?: any): StoreLog {
  return {
    id: guid(),
    level,
    message,
    data,
    date: new Date().toISOString()
  }
}

const storeLogReducer = createReducer(
  initialState,

  on(setLogToStoreLimit, (state, action) => {
    return {
      ...state,
      logLimit: action.logLimit
    }
  }),

  on(logToStore, (state, action) => {
    return adapter.upsertOne(createLog(action.level, action.message, action.data), {
      ...state
    })
  }),

  on(logToStoreSuccess, (state, action) => {

    const entities = Object.values(state.entities);

    const removeCount = entities.length - state.logLimit;

    if (removeCount) {

      const removeEntities = entities.splice(0, removeCount).map(storeLog => storeLog.id);

      console.log('Culling store logs', removeEntities);

      return adapter.removeMany(removeEntities, {...state});

    } else {
      return {
        ...state
      };
    }

  }),
);

export function reducer(state: StoreLogState | undefined, action: Action) {
  return storeLogReducer(state, action);
}

export const getStoreLogState = createFeatureSelector<StoreLogState>(FEATURE_KEY);
