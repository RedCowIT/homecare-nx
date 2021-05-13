/**
 * Data error actions from data service requests
 */

import {Action, createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

export const httpError = createAction(
  '[HTTP] Error',
  props<{ httpResponse: HttpErrorResponse, originalAction: Action }>()
);

export const dataError = createAction(
  '[Data] Error',
  props<{ error: any, originalAction: Action }>()
);
