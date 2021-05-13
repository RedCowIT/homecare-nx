import {Inject, Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {combineLatest, Observable, of} from "rxjs";
import {Auth0Service} from '../services/auth0/auth0.service';
import {first, map, mergeMap} from 'rxjs/operators';
import {AUTH0_DOMAINS} from '../tokens/auth0.config';

@Injectable()
export class Auth0Interceptor implements HttpInterceptor {

  private AUTH_HEADER = "Authorization";

  constructor(private auth0Service: Auth0Service, @Inject(AUTH0_DOMAINS) private forDomains) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // req = req.clone({
    //   headers: req.headers.set('Accept', 'application/json')
    //     .set('Content-Type', 'application/json')
    // });
//
//     console.log('intercept');

    return this.addAuthenticationToken(req).pipe(
      first(),
      mergeMap(augmentedRequest => {
        // console.log('aug request', augmentedRequest);
        return next.handle(augmentedRequest);
      })
    );
  }

  private addAuthenticationToken(request: HttpRequest<any>): Observable<HttpRequest<any>> {

    if (!this.protectDomain(request.url)) {
      return of(request);
    }

    return combineLatest([
      of(request),
      this.auth0Service.token$
    ]).pipe(
      map(([originalRequest, token]) => {

        // console.log('add token', token);

        if (!token) {
          return originalRequest;
        } else {

          return originalRequest.clone({
            headers: request.headers.append(this.AUTH_HEADER, "Bearer " + token)
          });
        }
      })
    );
  }

  private protectDomain(url: string): boolean {

    for (const domain of this.forDomains) {
      if (url.indexOf(domain) > -1) {
        return true;
      }
    }

    return false;
  }
}
