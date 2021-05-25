import {TestBed} from '@angular/core/testing';
import {HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable, of, throwError} from 'rxjs';
import {getHttpError} from './get-http-error';
import {catchError, map, tap} from 'rxjs/operators';
import {catchHttpError} from './catch-http-error';
import {catchHttpValidationErrors} from './catch-http-validation-errors';

describe('CatchHttpValidationErrors', () => {

    function createError(status: number, error: any): HttpErrorResponse {
      return new HttpErrorResponse({status, error});
    }

    function throwSource(source: any): Observable<any> {
      return of(1).pipe(tap(() => {
        throw source
      }));
    }


    it('should contain validation errors', () => {

      const source = createError(422, {
        message: 'hit',
        errors: {'foo': ['missing']}
      });

      let caughtError: any = null;

      throwSource(source).pipe(
        catchHttpValidationErrors(error => {
          caughtError = error;
          return EMPTY;
        }),
        catchError(error => this.fail())
      ).subscribe();

      expect(caughtError).toBeTruthy();
      expect(caughtError.message).toEqual('hit');
      expect(caughtError.errors.length).toEqual(1);
      expect(caughtError.errorMap.foo[0]).toEqual('missing');
      expect(caughtError.errors[0]).toEqual('missing');
    });
  }
);
