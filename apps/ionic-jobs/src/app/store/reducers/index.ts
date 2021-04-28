import {ActionReducerMap} from '@ngrx/store';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {SimpleRouterState} from '@homecare/shared';

export interface AppState {
    router: RouterReducerState<SimpleRouterState>;
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
};

