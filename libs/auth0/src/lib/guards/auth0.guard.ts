import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
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
export class Auth0Guard implements CanActivate {

  constructor(
    private auth0Service: Auth0Service,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth0Service.isAuthenticated$.pipe(
      tap(isAuthenticated => {

        if (!isAuthenticated) {
          console.log('!authenticated');
          this.auth0Service.login(state.url);
        } else {
          console.log('authenticated!');
        }
      })
    );
  }

}
