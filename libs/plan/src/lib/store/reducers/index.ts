import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';


export const storeFeatureKey = 'store';

export interface PlanState {

}

export const reducers: ActionReducerMap<PlanState> = {

};


export const metaReducers: MetaReducer<PlanState>[] = [];
