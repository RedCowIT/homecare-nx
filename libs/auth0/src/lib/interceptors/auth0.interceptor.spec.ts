import {Auth0Service} from '../services/auth0/auth0.service';

import {Auth0Interceptor} from './auth0.interceptor';
import {HttpRequest} from '@angular/common/http';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';

jest.mock('../services/auth0/auth0.service');

describe('Auth0Interceptor', () => {

  const TOKEN = 'secret';
  const AUTH_HEADER = 'Authorization';
  const AUTH_VALUE = 'Bearer ' + TOKEN;

  interface TestOptions {
    url: string,
    domains: string[],
    isAuthenticated: boolean,
    expectHeader: boolean
  };

  const MockAuth0Service = <jest.Mock<Auth0Service>>Auth0Service;
  const MockRequest = <jest.Mock<HttpRequest<any>>>HttpRequest;

  const mockNextHandler = {
    handle: (request: HttpRequest<any>) => of(null)
  };

  const nextHandleSpy = jest.spyOn(mockNextHandler, 'handle');

  function mockAuth0Service(isAuthenticated: boolean) {
    const service = <jest.Mocked<Auth0Service>>new MockAuth0Service();
    if (isAuthenticated) {
      Object.defineProperty(service, 'token$', {get: () => of(TOKEN)});
    } else {
      Object.defineProperty(service, 'token$', {get: () => of(null)});
    }
    return service;
  }

  function createRequest(url: string): HttpRequest<any> {
    return <jest.Mocked<HttpRequest<any>>>new MockRequest('GET', url);
  }

  /**
   * Run test with options and expect auth header to be present or not given inputs
   */
  function run(options: TestOptions) {

    const request = createRequest(options.url);

    const interceptor = new Auth0Interceptor(mockAuth0Service(options.isAuthenticated), options.domains);

    return interceptor.intercept(request, mockNextHandler).pipe(
      tap(() => {
        const augmentedRequest: HttpRequest<any> = nextHandleSpy.mock.calls[0][0];
        const headerValue = augmentedRequest.headers.get(AUTH_HEADER);

        if (options.expectHeader) {
          expect(headerValue).toEqual(AUTH_VALUE);
        } else {
          expect(headerValue).toBeFalsy();
        }
      })
    );

  }

  beforeEach(() => {

    nextHandleSpy.mockClear();

  });


  test('no token for unauthenticated domain match', done => {

    run({
      url: 'https://api.foobar.com',
      domains: ['www.foobar.com', 'api.foobar.com'],
      isAuthenticated: false,
      expectHeader: false
    }).subscribe(() => done());

  });

  test('adds token for authenticated domain match', done => {

    run({
      url: 'https://api.foobar.com',
      domains: ['www.foobar.com', 'api.foobar.com'],
      isAuthenticated: true,
      expectHeader: true
    }).subscribe(() => done());

  });

  test('bypass unprotected domain', done => {

    run({
      url: 'https://api.foobar.com',
      domains: ['api.external.com'],
      isAuthenticated: true,
      expectHeader: false
    }).subscribe(() => done());

  });

  test('bypass unprotected sub-domain', done => {

    run({
      url: 'https://nope.foobar.com',
      domains: ['api.foobar.com'],
      isAuthenticated: true,
      expectHeader: false
    }).subscribe(() => done());

  });

  test('bypass when no domains specified', done => {

    run({
      url: 'https://aou.foobar.com',
      domains: [],
      isAuthenticated: true,
      expectHeader: false
    }).subscribe(() => done());

  });

});
