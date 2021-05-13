import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';


export const storeFeatureKey = 'store';

export interface BillingState {

}

export const reducers: ActionReducerMap<BillingState> = {

};


export const metaReducers: MetaReducer<BillingState>[] = [];
