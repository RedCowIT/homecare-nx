import {createAction, props} from '@ngrx/store';
import {QuoteSection, QuoteSectionStatus} from "@homecare/shared";

export const initQuoteSections = createAction(
  '[Quote] Init Sections',
  props<{ appointmentId: number }>()
);

export const setQuoteSections = createAction(
  '[Quote] Set Section',
  props<{ appointmentId: number, quoteSections: QuoteSectionStatus[] }>()
);

export const completeQuoteSection = createAction(
  '[Quote] Complete Section',
  props<{ appointmentId: number, sectionId: QuoteSection }>()
);

