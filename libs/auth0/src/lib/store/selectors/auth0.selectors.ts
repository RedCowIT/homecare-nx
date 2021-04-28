import {createFeatureSelector, createSelector} from '@ngrx/store';
import {getRouteQueryParams} from '@homecare/core';
import * as fromFeature from '../reducers'
import {Auth0CallbackParams} from '@homecare/auth0';

export const selectAuthState = createFeatureSelector<fromFeature.State>(fromFeature.storeFeatureKey);

export const isInitialized = createSelector(
  selectAuthState,
  s1 => s1.isInitialized
);

export const isAuthenticated = createSelector(
  selectAuthState,
  s1 => s1.isAuthenticated
);

export const getToken = createSelector(
  selectAuthState,
  s1 => s1.token
);

export const getAuth0CallbackParams = createSelector(
  s => s,
  getRouteQueryParams,
  (s, queryParams) => {

    if (queryParams && queryParams.code && queryParams.state) {
      return <Auth0CallbackParams>{
        code: queryParams.code,
        state: queryParams.state
      };
    }
    return null;
  }
);
