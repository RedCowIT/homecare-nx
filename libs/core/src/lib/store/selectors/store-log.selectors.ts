import {createSelector} from '@ngrx/store';
import {adapter, getStoreLogState} from '../reducers/store-log.reducer';

export const {
  selectAll,
  selectEntities,
} = adapter.getSelectors();

export const getStoreLogs = createSelector(
  getStoreLogState,
  selectAll
);

export const getStoreLogMap = createSelector(
  getStoreLogState,
  selectEntities
);
