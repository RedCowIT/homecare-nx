import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {isHttpError, mapHttpErrorResponse} from './http-error-utils';


export const getHttpError = (status?: number) => <T>(source: Observable<T>) =>
  source.pipe(
    map(value => mapHttpErrorResponse(value)),
    filter((httpError, index) => {
      return isHttpError(httpError, status);
    })
  );
