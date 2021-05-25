import {EMPTY, Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {isHttpError, mapHttpErrorResponse, parseValidationErrors} from './http-error-utils';
import {catchHttpError} from './catch-http-error';


export const catchHttpValidationErrors = (selector: (err: any) => any, status?: number) => <T>(source: Observable<T>) =>
  source.pipe(
    catchHttpError(error => {
      return selector(parseValidationErrors(error));
    }, 422)
  );
