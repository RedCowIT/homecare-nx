import { Action } from '@ngrx/store';

export enum SharedActionTypes {
  LoadShareds = '[Shared] Load Shareds',
  
  
}

export class LoadShareds implements Action {
  readonly type = SharedActionTypes.LoadShareds;
}


export type SharedActions = LoadShareds;
