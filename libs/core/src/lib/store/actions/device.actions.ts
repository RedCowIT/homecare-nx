import {createAction, props} from '@ngrx/store';

export const initDeviceId = createAction(
  '[Device] Init'
);

export const setDeviceId = createAction(
  '[Device] Set Device ID',
  props<{ id: string }>()
);
