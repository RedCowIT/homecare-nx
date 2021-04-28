import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';


export const storeFeatureKey = 'store';

export interface SharedState {

}

export const reducers: ActionReducerMap<SharedState> = {

};


export const metaReducers: MetaReducer<SharedState>[] = [];
