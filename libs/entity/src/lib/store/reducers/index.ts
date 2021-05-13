import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import {EntitySyncState} from "./entity-sync.reducer";
import * as entitySyncReducer from './entity-sync.reducer';

export const FEATURE_KEY = 'entity';

export interface EntityState {
  entitySync: EntitySyncState
}

export const reducers: ActionReducerMap<EntityState> = {
  entitySync: entitySyncReducer.reducer
};


export const metaReducers: MetaReducer<EntityState>[] = [];

export const getEntityState = createFeatureSelector<EntityState>(FEATURE_KEY);
