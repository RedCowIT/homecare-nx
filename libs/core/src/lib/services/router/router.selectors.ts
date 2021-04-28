import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import {SimpleRouterState} from '@homecare/shared';

export const selectReducerState = createFeatureSelector<RouterReducerState<SimpleRouterState>>('router');

export const getRouterInfo = createSelector(
    selectReducerState,
    state => {

        if (state) {
            return state.state;
        }

        return null;
    }
);

export const getRouteQueryParams = createSelector(
    getRouterInfo,
    s => {

        if (s && s.queryParams) {
            return s.queryParams;
        }

        return null;
    }
);
