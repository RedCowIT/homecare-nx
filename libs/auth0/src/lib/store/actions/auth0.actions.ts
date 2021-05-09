import {createAction, props} from '@ngrx/store';

export const initAuth = createAction(
  '[Auth0] Init'
);

export const initAuthSuccess = createAction(
  '[Auth0] Init Auth Success'
);

export const initAuthError = createAction(
  '[Auth0] Init Auth Error',
  props<{ error: any }>()
);

export const handleAuthCallback = createAction(
  '[Auth0] Handle Auth Callback',
  props<{url?: string}>()
);

export const setAuth = createAction(
  '[Auth0] Set Auth',
  props<{ isAuthenticated: boolean, token?: string }>()
);

export const login = createAction(
  '[Auth0] Login',
  props<{ targetPath: string }>()
);

export const logout = createAction(
  '[Auth0] Logout',
  props<{ targetPath: string }>()
);

// export const setAuthenticatedStatus = createAction(
//   '[Auth0 Client] Set Authenticated Status',
//   props<{ isAuthenticated: boolean }>()
// );

export const redirectOnAuth = createAction(
  '[Auth0 Client] Redirect on Auth',
  props<{ targetPath: string }>()
);
