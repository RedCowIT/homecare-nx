import {HttpErrorResponse} from '@angular/common/http';
import {DataServiceError} from '@ngrx/data';

export function mapHttpErrorResponse(v: any): HttpErrorResponse {

  // Standard
  if (v instanceof HttpErrorResponse) {
    return v;
  }

  // Entity Action
  if (v && v.payload && v.payload.data && v.payload.data.error && v.payload.data.error.error) {
    if (v.payload.data.error.error instanceof HttpErrorResponse) {
      return v.payload.data.error.error;
    }
  }

  // Data Service (returned on subscription of entity collection op)
  if (v instanceof DataServiceError) {
    if (v.error instanceof HttpErrorResponse) {
      return v.error;
    }
  }

  return null;
}

export function isHttpError(error: HttpErrorResponse, status?: number) : boolean {

  if (!error) {
    return false;
  }

  if (status === undefined || status === null){
    return true;
  }

  return error.status === status;
}

export function parseValidationErrors(httpErrorResponse: HttpErrorResponse){
  const httpError = httpErrorResponse.error;
  const errorMap = httpError.errors;

  const errors = [];

  if (errorMap && typeof errorMap === 'object'){
    Object.keys(errorMap).forEach(key => {
      const fieldErrors: string[] = errorMap[key];
      errors.push(...fieldErrors);
    });
  }

  return {
    message: httpError.message,
    errorMap,
    errors
  };
}
