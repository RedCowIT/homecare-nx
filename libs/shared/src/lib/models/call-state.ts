/**
 * Call State structures for storing transient client state in NgRx stores
 *
 * Example:
 *
 * export interface ExampleState {
 *   user: User;
 *   loginCallState: CallState;
 * }
 *
 * export const initialExampleState {
 *     user: undefined,
 *     loginCallState: LoadingState.INIT
 * }
 *
 * on(AuthActions.login, (state, action) => {
 *       return {
 *           ...state,
 *           loginCallState: LoadingState.LOADING
 *       };
 *   }),
 *
 * on(AuthActions.loginSuccess, (state, action) => {
 *       return {
 *           ...state,
 *           auth: action.auth,
 *           loginCallState: LoadingState.LOADED
 *       };
 *   }),
 *
 * on(AuthActions.loginError, (state, action) => {
 *       return {
 *           ...state,
 *           loginCallState: {error: action.error}
 *       };
 *   })
 *
 *   on(AuthActions.resetLogin, (state, action) => {
 *       return {
 *           ...state,
 *           loginCallState: LoadingState.INIT
 *       };
 *   }),
 */

import {firstItem} from '../utils';
import {HttpErrorResponse} from "@angular/common/http";

export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface CallError {
  status: number;
  sourceError?: {
    message?: string;
    errors?: any;
  };
  errorMessage?: string;  // generic message
  errorArray?: string[]; // validation messages
}

/**
 * Create CallError from HttpErrorResponse
 *
 * Assumes Laravel validation defaults
 *
 * @param response
 */
export function createCallError(response: HttpErrorResponse): CallError {
  const callError: CallError = {
    status: response.status,
    sourceError: response
  }

  if (response.status === 422){
    if (response.error?.errors) {
      callError.errorArray = [].concat.apply([], Object.values(response.error.errors));
    }
  }

  if (response.error?.message){
    callError.errorMessage = response.error.message;
  }

  return callError;
}

export type CallState = LoadingState | CallError;

export function getCallError(callState: CallState): CallError {
  if (!callState) {
    return null;
  }

  if (callState instanceof HttpErrorResponse) {
    return createCallError(callState);
  }

  return null;
}

export function hasCallError(callState: CallState): boolean {
  return !!getCallError(callState);
}

// Helper function to extract error, if there is one.
export function getCallErrorMessage(callState: CallState): string | null {

  const errorData = getCallError(callState)

  if (errorData?.errorArray?.length) {
    return firstItem(errorData.errorArray);
  }

  return errorData?.errorMessage;
}
