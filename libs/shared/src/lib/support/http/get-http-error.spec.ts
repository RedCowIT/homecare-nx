import {TestBed} from '@angular/core/testing';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {getHttpError} from './get-http-error';
import {tap} from 'rxjs/operators';

describe('GetHttpError', () => {

    function createError(status: number, error: any): HttpErrorResponse {
      return new HttpErrorResponse({status, error});
    }

    function createPayload(status: number, error: any): any {
      return {
        payload: {
          data: {
            error: {
              error: createError(status, error)
            }
          }
        }
      };
    }

    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

    it('should ignore unknown payload', () => {

      const payload = {payload: {data: {invalid: true}}};

      of(payload).pipe(getHttpError(), tap(value => fail())).subscribe();

    });

    it('should ignore non-http error instance', () => {

      const payload = createPayload(500, 'oops');
      payload.payload.data.error.error = new Error('ouch');

      of(payload).pipe(getHttpError(), tap(value => fail())).subscribe();

    });

    it('should ignore unwanted status code', () => {
      const payload = createPayload(500, 'oops');

      of(payload).pipe(getHttpError(422), tap(value => fail())).subscribe();
    });

    it('should filter', () => {
      const payload = createPayload(422, 'oops');
      let response: HttpErrorResponse;
      of(payload).pipe(getHttpError(), tap(value => response = value)).subscribe();
      expect(response.error).toEqual('oops');
    });

    it('should filter status code', () => {
      const payload = createPayload(422, 'oops');
      let response: HttpErrorResponse;
      of(payload).pipe(getHttpError(422), tap(value => response = value)).subscribe();
      expect(response.error).toEqual('oops');
    });
  }
);
