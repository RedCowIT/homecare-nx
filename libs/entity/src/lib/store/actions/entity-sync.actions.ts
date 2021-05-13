import {createAction, props} from '@ngrx/store';

/**
 * Register entity for syncing between API and storage
 */
export const registerEntity = createAction(
  '[Sync Entity] Register Entity',
  props<{ entityName: string }>()
);

export const unregisterEntity = createAction(
  '[Sync Entity] Unregister Entity',
  props<{ entityName: string }>()
);

/**
 * payloadEntityName is the name of the entity used to determine
 * whether entities require remote sync. It can be a simple model with just an id field.
 */
export const initEntitySync = createAction(
  '[Sync Entity] Init',
  props<{ payloadEntityName: string }>()
);

export const initEntitySyncError = createAction(
  '[Sync Entity] Init Error',
  props<{ error: any }>()
);

export const initEntitySyncSuccess = createAction(
  '[Sync Entity] Init Success'
);

export const syncEntities = createAction(
  '[Sync Entity] Sync'
);

export const syncEntitiesError = createAction(
  '[Sync Entity] Sync Error',
  props<{ error: any }>()
);

export const syncEntitiesSuccess = createAction(
  '[Sync Entity] Sync Success',
  props<{ payloadId: string}>()
);

export const fetchSyncEntities = createAction(
  '[Sync Entity] Fetch'
);

export const fetchSyncEntitiesError = createAction(
  '[Sync Entity] Fetch Error',
  props<{ error: any }>()
);

export const fetchSyncEntitiesSuccess = createAction(
  '[Sync Entity] Fetch Success'
);
