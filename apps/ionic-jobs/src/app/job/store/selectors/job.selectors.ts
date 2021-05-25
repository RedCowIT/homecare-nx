import {createSelector} from '@ngrx/store';
import {adapter, getJobState} from '../reducers/job.reducer';

export const {
  selectAll,
  selectEntities,
} = adapter.getSelectors();


export const getJobs = createSelector(
  getJobState,
  selectAll
);

export const getJobMap = createSelector(
  getJobState,
  selectEntities
);
