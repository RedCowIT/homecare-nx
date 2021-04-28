import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';


export const storeFeatureKey = 'store';

export interface CoreState {

}

export const reducers: ActionReducerMap<CoreState> = {

};


export const metaReducers: MetaReducer<CoreState>[] = [];
