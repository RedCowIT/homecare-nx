import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import {CacheStoreState} from "./cache-store.reducer";
import * as cacheStoreReducer from './cache-store.reducer';

export const storeFeatureKey = 'storage';

export interface StorageState {
  cacheStore: CacheStoreState
}

export const reducers: ActionReducerMap<StorageState> = {
  cacheStore: cacheStoreReducer.reducer
};

export const metaReducers: MetaReducer<StorageState>[] = [];
