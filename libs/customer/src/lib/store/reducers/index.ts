import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';


export const storeFeatureKey = 'store';

export interface CustomerState {

}

export const reducers: ActionReducerMap<CustomerState> = {

};


export const metaReducers: MetaReducer<CustomerState>[] = [];
