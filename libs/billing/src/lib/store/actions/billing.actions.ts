import {Action, createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from "@angular/common/http";

export const loadBillings = createAction(
  '[Billing] Load Billings'
);

export const invoiceLoaded = createAction(
  '[Billing] Invoice Loaded',
  props<{ appointmentId: number, invoiceId: number, hasPlans: boolean }>()
)


