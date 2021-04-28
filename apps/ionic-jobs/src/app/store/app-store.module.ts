import {NgModule} from '@angular/core';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from '../../environments/environment';
import {reducers} from './reducers';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {SimpleRouterStateSerializer} from '@homecare/core';
import {DefaultDataServiceConfig, DefaultDataServiceFactory, EntityDataModule} from '@ngrx/data';

import {ExtendedDataServiceFactory} from '@homecare/core';
// import { storeFreeze } from 'ngrx-store-freeze';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.api.baseUrl,
  timeout: environment.api.timeout
};

export const metaReducers: MetaReducer<any>[] = environment.production
  ? []
  : []; // [storeFreeze];

@NgModule({
  imports: [
    StoreModule.forRoot(
      reducers,
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      serializer: SimpleRouterStateSerializer
    }),
    EntityDataModule.forRoot({}),
  ],
  providers: [
    {provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig},
    {
      provide: DefaultDataServiceFactory,
      useClass: ExtendedDataServiceFactory
    }
  ]
})
export class AppStoreModule {
}
