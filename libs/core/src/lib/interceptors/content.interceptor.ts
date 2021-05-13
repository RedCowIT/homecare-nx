import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

/**
 * Sets default content headers.
 *
 * Accept: application/json
 * Content-Type: application/json
 *
 * Content-Type is not set if there's already a Content-Type header set on a request
 */
@Injectable()
export class ContentInterceptor implements HttpInterceptor {

  protected readonly defaultAccept = 'application/json';
  protected readonly defaultContentType = 'application/json';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({
      headers: req.headers.append('accept', this.defaultAccept)
    });

    if (!(req.body instanceof FormData)){
      req = req.clone({
        headers: req.headers.append('content-type', this.defaultContentType)
      });
    }

    return next.handle(req);
  }
}
