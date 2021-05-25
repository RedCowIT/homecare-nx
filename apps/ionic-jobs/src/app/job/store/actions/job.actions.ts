import {createAction, props} from '@ngrx/store';
import {Job, JobSection, JobSectionStatus} from "@homecare/shared";

export const addJob = createAction(
  '[Job] Add Job',
  props<{ appointmentId: number }>()
);

export const removeJob = createAction(
  '[Job] Remove Job',
  props<{ appointmentId: number }>()
);

export const setJobSections = createAction(
  '[Job] Set Job Sections',
  props<{ appointmentId: number, jobSections: JobSectionStatus[] }>()
);

export const updateJob = createAction(
  '[Job] Update Job',
  props<{ job: Job }>()
);

