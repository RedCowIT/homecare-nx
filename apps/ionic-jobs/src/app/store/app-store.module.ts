import {NgModule} from '@angular/core';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from '../../environments/environment';
import {reducers} from './reducers';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {ExtendedDataServiceFactory, SimpleRouterStateSerializer} from '@homecare/core';
import {DefaultDataServiceConfig, DefaultDataServiceFactory, EntityDataModule} from '@ngrx/data';
import {AppEffects} from "./effects/app.effects";
// import { storeFreeze } from 'ngrx-store-freeze';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.api.baseUrl,
  timeout: environment.api.timeout
};

export const pluralNames = {
  // Case matters. Match the case of the entity name.
  DirectDebitDetails: 'DirectDebitDetails'
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
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      serializer: SimpleRouterStateSerializer
    }),
    EntityDataModule.forRoot({
      pluralNames: pluralNames
    }),
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
