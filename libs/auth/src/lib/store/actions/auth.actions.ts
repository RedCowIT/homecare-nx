import { createAction, props } from '@ngrx/store';

export const initAuth = createAction(
  '[Auth] Init'
);

export const initAuthSuccess = createAction(
  '[Auth] Init Auth Success'
);

export const initAuthError = createAction(
  '[Auth] Init Auth Error',
  props<{ error: any }>()
);

export const setAuth = createAction(
  '[Auth] Set Auth',
  props<{ isAuthenticated: boolean, token?: string }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ username: string, password: string }>()
);

export const loginError = createAction(
  '[Auth] Login Error',
  props<{ error: any }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success'
);

export const logout = createAction(
  '[Auth] Logout',
  props<{ targetPath: string }>()
);


