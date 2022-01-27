import {createSelector} from '@ngrx/store';
import {getEntityState} from "../reducers";
import {LoadingState} from "@homecare/shared";

export const getEntitySyncState = createSelector(
  getEntityState,
  s1 => s1.entitySync
)
export const isEntitySyncInitialized = createSelector(
  getEntitySyncState,
  s1 => s1.initialized
);

export const selectSyncEntities = createSelector(
  getEntitySyncState,
  s1 => s1.entities
);

export const selectEntitySyncPayloadEntityName = createSelector(
  getEntitySyncState,
  s1 => s1.payloadEntityName
);

export const selectEntitySyncPayloadId = createSelector(
  getEntitySyncState,
  s1 => s1.payloadId
);

export const selectIsEntitySyncLoading = createSelector(
  getEntitySyncState,
  s1 => s1.callState === LoadingState.LOADING
);
