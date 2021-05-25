import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getHttpError} from './get-http-error';
import {parseValidationErrors} from './http-error-utils';

/**
 * Filters ngrx/data service exceptions to return http response validation errors
 */
export const ofHttpValidationErrors = () => <T>(source: Observable<T>) =>
  source.pipe(
    getHttpError(422),
    map(httpErrorResponse => {

      return parseValidationErrors(httpErrorResponse);

    })
  );
