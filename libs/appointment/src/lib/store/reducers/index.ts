import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';


export const storeFeatureKey = 'store';

export interface AppointmentState {

}

export const reducers: ActionReducerMap<AppointmentState> = {

};


export const metaReducers: MetaReducer<AppointmentState>[] = [];
