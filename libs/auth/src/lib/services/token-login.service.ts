import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrlService} from "@homecare/common";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {CacheStoreService} from "@homecare/storage";

/**
 * Token Auth Facade Service
 */
@Injectable({
  providedIn: 'root'
})
export class TokenLoginService {

  static readonly TOKEN_KEY = 'auth_token';

  readonly isAuthenticated$: Observable<boolean>;

  readonly token$: Observable<string>;

  constructor(protected httpClient: HttpClient,
              protected apiUrlService: ApiUrlService,
              protected cacheStorageService: CacheStoreService) {
    this.isAuthenticated$ = this.getToken().pipe(map(token => token && token !== ''));
    this.token$ = this.getToken();
  }

  login(username: string, password: string): Observable<string> {

    return this.httpClient.post(this.url(), {
      username, password
    }).pipe(
      map((response: any) => {
        return response?.token;
      }),
      tap(token => {
        this.cacheStorageService.set(TokenLoginService.TOKEN_KEY, token);
      })
    );

  }

  logout() {
    this.cacheStorageService.remove(TokenLoginService.TOKEN_KEY);
  }

  url(): string {
    return this.apiUrlService.url('login');
  }

  getToken(): Observable<string> {
    return this.cacheStorageService.get<string>(TokenLoginService.TOKEN_KEY);
  }


}
