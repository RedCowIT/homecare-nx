import {EMPTY, Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {isHttpError, mapHttpErrorResponse} from './http-error-utils';



export const catchHttpError = (selector: (err: any) => any, status?: number) => <T>(source: Observable<T>) =>
  source.pipe(
    catchError(error => {

      const httpError = mapHttpErrorResponse(error);

      if (isHttpError(httpError, status)) {
        return selector(httpError);
      }

      return throwError(error);
    })
  );
