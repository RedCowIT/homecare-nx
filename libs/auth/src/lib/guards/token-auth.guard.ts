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
import {TokenAuthService} from "../services/token-auth.service";

/**
 * Auth0Guard allows activation if authenticated with Auth0
 *
 * Invokes login flow if activation is rejected
 */
@Injectable({
  providedIn: 'root'
})
export class TokenAuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: TokenAuthService,
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

    return this.authService.isAuthenticated$.pipe(
      tap(async isAuthenticated => {
        if (!isAuthenticated) {
          await this.router.navigateByUrl('/login');
        }
      })
    );

  }

}
