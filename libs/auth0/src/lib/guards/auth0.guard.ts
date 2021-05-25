import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Auth0Service} from '../services/auth0/auth0.service';

/**
 * Auth0Guard allows activation if authenticated with Auth0
 *
 * Invokes login flow if activation is rejected
 */
@Injectable({
  providedIn: 'root'
})
export class Auth0Guard implements CanActivate, CanActivateChild {

  constructor(
    private auth0Service: Auth0Service,
    private router: Router
  ) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.doCanActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.doCanActivate(route, state);
  }

  doCanActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth0Service.isAuthenticated$.pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.auth0Service.login(state.url);
        }
      })
    );

  }

}
