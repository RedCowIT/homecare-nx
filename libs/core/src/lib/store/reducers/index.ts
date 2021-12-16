import {ActionReducerMap, MetaReducer} from '@ngrx/store';

import {StoreLogState} from './store-log.reducer';
import * as storeLogReducer from './store-log.reducer';

export const storeFeatureKey = 'core';

export interface CoreState {

}

export const reducers: ActionReducerMap<CoreState> = {

};

export const metaReducers: MetaReducer<CoreState>[] = [];
