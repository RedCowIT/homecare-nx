import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';

export const storeFeatureKey = 'store';

export interface MainState {

}

export const reducers: ActionReducerMap<MainState> = {

};


export const metaReducers: MetaReducer<MainState>[] = !environment.production ? [] : [];
