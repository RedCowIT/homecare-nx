import {createAction, props} from '@ngrx/store';

export const initCacheStore = createAction(
  '[Cache Store] Init'
);

export const initCacheStoreSuccess = createAction(
  '[Cache Store] Init',
  props<{keys: string[]}>()
);

export const flushCacheStore = createAction(
  '[Cache Store] Flush'
);

export const flushCacheStoreSuccess = createAction(
  '[Cache Store] Flush Success'
);

export const removeCacheStoreItem = createAction(
  '[Cache Store] Remove Item',
  props<{key: string}>()
);

export const removeCacheStoreItemSuccess = createAction(
  '[Cache Store] Remove Item Success',
  props<{key: string}>()
);

export const setCacheStoreItem = createAction(
  '[Cache Store] Set Item',
  props<{key: string, data: unknown}>()
)

export const setCacheStoreItemSuccess = createAction(
  '[Cache Store] Set Item Success',
  props<{key: string}>()
)

export const setCacheStoreItemError = createAction(
  '[Cache Store] Set Item Error',
  props<{error: any}>()
)

export const getCacheStoreItem = createAction(
  '[Cache Store] Get Item',
  props<{key: string}>()
)




