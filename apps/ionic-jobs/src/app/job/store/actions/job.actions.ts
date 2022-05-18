import {createAction, props} from '@ngrx/store';
import {Job, JobSection, JobSectionStatus, PreJobSection} from "@homecare/shared";

export const addJob = createAction(
  '[Job] Add Job',
  props<{ appointmentId: number }>()
);

export const addJobSuccess = createAction(
  '[Job] Add Job Success',
  props<{ appointmentId: number, jobSections: JobSectionStatus[] }>()
);

export const removeJob = createAction(
  '[Job] Remove Job',
  props<{ appointmentId: number }>()
);

export const addJobError = createAction(
  '[Job] Add Job Error',
  props<{ appointmentId: number, error: any }>()
);

export const setJobSections = createAction(
  '[Job] Set Job Sections',
  props<{ appointmentId: number, jobSections: JobSectionStatus[] }>()
);

export const reloadJobSections = createAction(
  '[Job] Reload Sections',
  props<{ appointmentId: number }>()
);

export const updateJob = createAction(
  '[Job] Update Job',
  props<{ job: Job }>()
);

export const completeJobSection = createAction(
  '[Job] Complete Section',
  props<{ appointmentId: number, sectionId: JobSection }>()
);

