import {Action, createFeatureSelector, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState, Update} from '@ngrx/entity';
import {Job} from "@homecare/shared";
import {addJob, setJobSections} from "../actions/job.actions";
import {setPreJobSections} from "../actions/pre-job.actions";


export const FEATURE_KEY = 'jobs';

export interface JobState extends EntityState<Job> {

}

export function selectJobId(job: Job): string {
  return `${job.appointmentId}`;
}

export const adapter = createEntityAdapter<Job>({
  selectId: selectJobId
});

export const initialState: JobState = adapter.getInitialState({});

const channelReducer = createReducer(
  initialState,

  on(addJob, (state, action) => adapter.upsertOne({
    appointmentId: action.appointmentId
  }, {
    ...state
  })),

  on(setJobSections, (state, action) => {

    const job: Update<Job> = {
      id: action.appointmentId,
      changes: {
        jobSections: action.jobSections,
      }
    };

    return adapter.updateOne(job, {
      ...state
    });

  }),

  on(setPreJobSections, (state, action) => {

    const job: Update<Job> = {
      id: action.appointmentId,
      changes: {
        preJobSections: action.preJobSections,
      }
    };

    return adapter.updateOne(job, {
      ...state
    });

  })
);

export function reducer(state: JobState | undefined, action: Action) {
  return channelReducer(state, action);
}

export const getJobState = createFeatureSelector<JobState>(FEATURE_KEY);
