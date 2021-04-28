import {Params} from '@angular/router';

export interface SimpleRouterState {
  url: string;
  params: Params;
  queryParams: Params;
}
