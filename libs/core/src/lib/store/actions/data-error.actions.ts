/**
 * Data error actions from data service requests
 */

import {Action, createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

export const httpError = createAction(
  '[HTTP] Error',
  props<{ httpResponse: HttpErrorResponse, originalAction: Action }>()
);

export const dataServiceError = createAction(
  '[DataService] Error',
  props<{ error: any, originalAction: Action }>()
);

export const entityError = createAction(
  '[Entity] Error',
  props<{ error: any, originalAction: Action }>()
);
