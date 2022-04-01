import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromStore from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {Auth0Effects} from './store/effects/auth0.effects';
import {Auth0Service} from './services/auth0/auth0.service';
import {Auth0ClientService} from './services/auth0-client/auth0-client.service';
import {Auth0Config} from './models/auth0-config';
import {AUTH0_CONFIG, AUTH0_DOMAINS} from './tokens/auth0.config';
import {Auth0InitService} from './services/auth0-init/auth0-init.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Auth0Interceptor} from './interceptors/auth0.interceptor';

@NgModule({
  imports: [
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducer),
    EffectsModule.forFeature([Auth0Effects]),
  ],
  providers: []
})
export class Auth0Module {
  static forRoot(config: Auth0Config, domains: string[]): ModuleWithProviders<Auth0Module> {
    return {
      ngModule: Auth0Module,
      providers: [
        Auth0InitService,
        Auth0Service,
        Auth0ClientService,
        {
          provide: AUTH0_CONFIG,
          useValue: config
        },
        {
          provide: AUTH0_DOMAINS,
          useValue: domains
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: Auth0Interceptor,
          multi: true,
          deps: [Auth0Service, AUTH0_DOMAINS]
        }
      ]
    };
  }
}
