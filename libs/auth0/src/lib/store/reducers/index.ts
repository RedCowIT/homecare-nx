import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';


export const storeFeatureKey = 'store';

export interface Auth0State {

}

export const reducers: ActionReducerMap<Auth0State> = {

};


export const metaReducers: MetaReducer<Auth0State>[] = [];
