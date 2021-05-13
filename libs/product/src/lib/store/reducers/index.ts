import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';


export const storeFeatureKey = 'store';

export interface ProductState {

}

export const reducers: ActionReducerMap<ProductState> = {

};


export const metaReducers: MetaReducer<ProductState>[] = [];
