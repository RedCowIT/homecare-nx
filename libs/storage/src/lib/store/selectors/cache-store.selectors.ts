import {createSelector} from '@ngrx/store';
import {getCacheStoreState} from "../reducers/cache-store.reducer";

export const isCacheStoreInitialized = createSelector(
  getCacheStoreState,
  s1 => s1.isInitialized
);

export const selectCacheStoreKeys = createSelector(
  getCacheStoreState,
  s1 => s1.keys
);
