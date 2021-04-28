import {Action, createReducer, on} from '@ngrx/store';
import {CallState, LoadingState} from '@homecare/shared';
import {auth0Actions} from '../actions';

export const storeFeatureKey = 'auth0';

export interface State {
  isInitialized: boolean,
  isAuthenticated: boolean,
  token: string,
  callState: CallState
}

export const initialAuth0State: State = {
  isInitialized: false,
  isAuthenticated: false,
  token: undefined,
  callState: LoadingState.INIT
};

const auth0Reducer = createReducer(
  initialAuth0State,

  on(auth0Actions.initAuth, state => ({
    ...state,
    callState: LoadingState.LOADING
  })),

  on(auth0Actions.initAuthSuccess, (state, action) => {
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.isAuthenticated,
        token: action.token,
        callState: LoadingState.LOADED
      }
    }
  ),

  on(auth0Actions.initAuthError, (state, action) => {
    return {
      ...state,
      callState: action.error
    }
  }),

  on(auth0Actions.logout, state => ({
      ...state,
      isAuthenticated: false,
      token: undefined,
      callState: LoadingState.INIT
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return auth0Reducer(state, action);
}
