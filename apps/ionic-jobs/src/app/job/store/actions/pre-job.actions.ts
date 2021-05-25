import {createAction, props} from '@ngrx/store';
import {PreJobSection, PreJobSectionStatus} from "@homecare/shared";

export const initPreJobSections = createAction(
  '[PreJob] Init Sections',
  props<{ appointmentId: number }>()
);

export const setPreJobSections = createAction(
  '[PreJob] Set Section',
  props<{ appointmentId: number, preJobSections: PreJobSectionStatus[]  }>()
);

export const completePreJobSection = createAction(
  '[PreJob] Complete Section',
  props<{ appointmentId: number, sectionId: PreJobSection }>()
);

