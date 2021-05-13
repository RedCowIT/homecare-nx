import {Injectable} from '@angular/core';
import {DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator} from '@ngrx/data';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, timeout} from 'rxjs/operators';

/**
 * Maps all API responses to return data payload
 *
 * Default ngrx/data expects raw payloads, e.g. [1,2,3];
 * Engagewall API returns nested payload {data: [1,2,...]}.
 *
 * This extension marshals that mapping.
 */
@Injectable({
  providedIn: 'root'
})
export class ExtendedDataservice<T> extends DefaultDataService<T> {

  constructor(http: HttpClient, entityName: string, httpUrlGenerator: HttpUrlGenerator, config?: DefaultDataServiceConfig) {
    super(entityName, http, httpUrlGenerator, config);
  }

  protected execute(method: "DELETE" | "GET" | "POST" | "PUT", url: string, data?: any, options?: any): Observable<any> {

    // TODO: if data has count_only


    return super.execute(method, url, data, options).pipe(
      map(res => {

        if (method === 'DELETE') {
          return res;
        }

        if (!res) {
          throw new Error(`No server response: ${method} : ${url}`);
        }

        if (!res.data) {
          throw new Error(`Server responded without data payload: ${method} : ${url}`);
        }

        return res.data;
      })
    );

  }
}
