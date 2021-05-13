import {Action, createFeatureSelector, createReducer, on} from '@ngrx/store';
import {setDeviceId} from '../actions/device.actions';

export const FEATURE_KEY = 'device';

export interface DeviceState {
  id: string;
  test: string;
}

export const initialState: DeviceState = {
  id: undefined,
  test: undefined
}

const deviceReducer = createReducer(
  initialState,

  on(setDeviceId, (state, action) => {

    return {
      ...state,
      id: action.id
    };
  })
);

export function reducer(state: DeviceState | undefined, action: Action) {
  return deviceReducer(state, action);
}

export const getDeviceState = createFeatureSelector<DeviceState>(FEATURE_KEY);
