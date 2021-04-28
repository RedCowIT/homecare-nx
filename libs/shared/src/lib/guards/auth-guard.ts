import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

export abstract class AuthGuard implements CanActivate {

  abstract canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>;

}
