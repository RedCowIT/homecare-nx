import {TestBed} from '@angular/core/testing';
import {HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable, of, throwError} from 'rxjs';
import {getHttpError} from './get-http-error';
import {catchError, map, tap} from 'rxjs/operators';
import {catchHttpError} from './catch-http-error';

describe('CatchHttpError', () => {

    function createError(status: number, error: any): HttpErrorResponse {
      return new HttpErrorResponse({status, error});
    }

    function throwSource(source: any): Observable<any> {
      return of(1).pipe(tap(() => {
        throw source
      }));
    }

    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

    test('catch error test method', () => {
      const source = new Error('miss');

      let missError: Error = null;

      throwSource(source).pipe(
        catchError(error => {
          missError = error;
          return EMPTY;
        })
      ).subscribe();

      expect(missError).toBeTruthy();
    });

    it('should ignore non-http error', () => {

      const source = new Error('miss');

      let missError: Error = null;

      throwSource(source).pipe(
        catchHttpError((error => this.fail())),
        catchError(error => {
          missError = error;
          return EMPTY;
        })
      ).subscribe();

      expect(missError).toBeTruthy();
      expect(missError.message).toEqual('miss');
    });

    it('should catch error', () => {

      const source = createError(500, 'hit');

      let caughtError: any = null;

      throwSource(source).pipe(
        catchHttpError(error => {
          caughtError = error;
          return EMPTY;
        }),
        catchError(error => this.fail())
      ).subscribe();

      expect(caughtError).toBeTruthy();
      expect(caughtError.error).toEqual('hit');
    });

    it('should ignore other status error', () => {

      const source = createError(500, 'miss');

      let missError: any = null;

      throwSource(source).pipe(
        catchHttpError((error => this.fail()), 422),
        catchError(error => {
          missError = error;
          return EMPTY;
        })
      ).subscribe();

      expect(missError).toBeTruthy();
      expect(missError.error).toEqual('miss');
    });

  it('should catch error with status', () => {

    const source = createError(422, 'hit');

    let caughtError: any = null;

    throwSource(source).pipe(
      catchHttpError(error => {
        caughtError = error;
        return EMPTY;
      }, 422),
      catchError(error => this.fail())
    ).subscribe();

    expect(caughtError).toBeTruthy();
    expect(caughtError.error).toEqual('hit');
  });
  }
);
