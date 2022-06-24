import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers'
import {getCallError, getCallErrorMessage, LoadingState} from "@homecare/shared";

export const selectAuthState = createFeatureSelector<fromFeature.State>(fromFeature.storeFeatureKey);

export const isInitialized = createSelector(
  selectAuthState,
  s1 => s1.isInitialized
);

export const isAuthenticated = createSelector(
  selectAuthState,
  s1 => {

    return s1.isAuthenticated;
  }
);

export const getToken = createSelector(
  selectAuthState,
  s1 => s1.token
);

export const getUsername = createSelector(
  selectAuthState,
  s1 => s1.username
);

export const isLoggingIn = createSelector(
  selectAuthState,
  s1 => s1.loginCallState === LoadingState.LOADING
)

export const getLoginError = createSelector(
  selectAuthState,
  s1 => getCallErrorMessage(s1.loginCallState)
)
