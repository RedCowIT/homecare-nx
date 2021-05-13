import {Action, createFeatureSelector, createReducer, on} from '@ngrx/store';
import {
  initEntitySync,
  initEntitySyncError,
  initEntitySyncSuccess,
  registerEntity, syncEntities, syncEntitiesError, syncEntitiesSuccess,
  unregisterEntity
} from "../actions/entity-sync.actions";
import {addItem, CallState, LoadingState, removeItem} from "@homecare/shared";

export const FEATURE_KEY = 'entitySync';

export interface EntitySyncState {
  entities: string[];
  updatedAt: string;
  payloadEntityName: string;
  payloadId: string;
  initialized: boolean; // true when data has completely loaded for the first time
  callState: CallState;
}

export const initialState: EntitySyncState = {
  entities: [],
  updatedAt: undefined,
  payloadEntityName: undefined,
  payloadId: undefined,
  initialized: undefined,
  callState: undefined
}

const entitySyncReducer = createReducer(
  initialState,

  on(registerEntity, (state, action) => {

    // ignore multiple registrations of same entity
    if (state.entities.includes(action.entityName)) {
      return state;
    }

    return {
      ...state,
      entities: addItem<string>([...state.entities], action.entityName)
    };
  }),

  on(unregisterEntity, (state, action) => {
    return {
      ...state,
      entities: removeItem<string>([...state.entities], action.entityName)
    };
  }),

  on(initEntitySync, (state, action) => {

    return {
      ...state,
      payloadEntityName: action.payloadEntityName
    };

  }),

  on(initEntitySyncSuccess, (state, action) => {

    return {
      ...state,
      initialized: true,
      callState: LoadingState.LOADED
    };

  }),

  on(initEntitySyncError, (state, action) => {

    return {
      ...state,
      callState: action.error
    };

  }),

  on(syncEntities, (state, action) => {

    return {
      ...state,
      callState: LoadingState.LOADING
    };

  }),

  on(syncEntitiesSuccess, (state, action) => {

    return {
      ...state,
      payloadId: action.payloadId,
      callState: LoadingState.LOADED
    };

  }),

  on(syncEntitiesError, (state, action) => {

    return {
      ...state,
      callState: action.error
    };

  }),
);

export function reducer(state: EntitySyncState | undefined, action: Action) {
  return entitySyncReducer(state, action);
}

//export const getEntitySyncState = createFeatureSelector<EntitySyncState>(FEATURE_KEY);
