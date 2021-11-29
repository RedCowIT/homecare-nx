import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';


export const storeFeatureKey = 'store';

export interface DocumentState {

}

export const reducers: ActionReducerMap<DocumentState> = {

};


export const metaReducers: MetaReducer<DocumentState>[] = [];
