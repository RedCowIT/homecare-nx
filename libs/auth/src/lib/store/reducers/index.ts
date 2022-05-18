import {Action, createReducer, on} from '@ngrx/store';
import {CallState, getCallError, LoadingState} from '@homecare/shared';
import {authActions} from '../actions';

export const storeFeatureKey = 'auth';

export interface State {
  isInitialized: boolean,
  loginCallState: CallState,
  isAuthenticated: boolean,
  username: string,
  token: string,
  callState: CallState
}

export const initialAuth0State: State = {
  isInitialized: false,
  loginCallState: LoadingState.INIT,
  isAuthenticated: false,
  username: undefined,
  token: undefined,
  callState: LoadingState.INIT
};

const auth0Reducer = createReducer(
  initialAuth0State,

  on(authActions.initAuth, state => ({
    ...state,
    callState: LoadingState.LOADING
  })),

  on(authActions.initAuthSuccess, (state, action) => {
      return {
        ...state,
        isInitialized: true,
        callState: LoadingState.LOADED
      }
    }
  ),

  on(authActions.initAuthError, (state, action) => {
    return {
      ...state,
      callState: action.error
    }
  }),

  on(authActions.setAuth, (state, action) => {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        username: action.username,
        token: action.token
      }
    }
  ),

  on(authActions.login, (state, action) => {
      return {
        ...state,
        loginCallState: LoadingState.LOADING
      }
    }
  ),

  on(authActions.loginError, (state, action) => ({
    ...state,
    loginCallState: action.error
  })),

  on(authActions.loginSuccess, state => ({
      ...state,
      loginCallState: LoadingState.LOADED
  })),

  on(authActions.logout, state => ({
      ...state,
      isAuthenticated: false,
      token: undefined,
      callState: LoadingState.INIT,
      loginCallState: LoadingState.INIT
    })
  )

);

export function reducer(state: State | undefined, action: Action) {
  return auth0Reducer(state, action);
}
