import {Injectable} from '@angular/core';
import {RouterStateSerializer} from '@ngrx/router-store';
import {RouterStateSnapshot} from '@angular/router';
import {SimpleRouterState} from '@homecare/shared';

/**
 * Custom serializer for setting route state url, params and query params.
 *
 * Usage in AppModule
 *
 * <pre>
 * imports: [
 * ...,
 * StoreRouterConnectingModule
 * ],
 * providers: [{ provide: RouterStateSerializer, useClass: SimplerRouterStateSerializer }],
 * </pre>
 *
 */
@Injectable({
  providedIn: 'root'
})
export class SimpleRouterStateSerializer implements RouterStateSerializer<SimpleRouterState> {
  serialize(routerState: RouterStateSnapshot): SimpleRouterState {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: {queryParams}
    } = routerState;
    const {params} = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return {url, params, queryParams};
  }
}
