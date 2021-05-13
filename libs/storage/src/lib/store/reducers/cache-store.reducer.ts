import {Action, createFeatureSelector, createReducer, on} from '@ngrx/store';
import {
  flushCacheStore,
  initCacheStoreSuccess,
  removeCacheStoreItemSuccess,
  setCacheStoreItemSuccess
} from "../actions/cache-store.actions";
import {addItem, removeItem} from "@homecare/shared";

export const FEATURE_KEY = 'cacheStore';

export interface CacheStoreState {
  keys: Array<string>;
  isInitialized: boolean;
}

export const initialState: CacheStoreState = {
  keys: [],
  isInitialized: undefined
}

const cacheStoreReducer = createReducer(
  initialState,

  on(initCacheStoreSuccess, (state, action) => {

    return {
      ...state,
      isInitialized: true
    };

  }),

  on(flushCacheStore, (state, action) => {

    return {
      ...state,
      keys: []
    };

  }),

  on(removeCacheStoreItemSuccess, (state, action) => {

    return {
      ...state,
      keys: removeItem<string>([...state.keys], action.key)
    };

  }),

  on(setCacheStoreItemSuccess, (state, action) => {

    return {
      ...state,
      keys: addItem<string>([...state.keys], action.key)
    };

  }),
);

export function reducer(state: CacheStoreState | undefined, action: Action) {
  return cacheStoreReducer(state, action);
}

export const getCacheStoreState = createFeatureSelector<CacheStoreState>(FEATURE_KEY);
