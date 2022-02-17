import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponentsModule} from './auth-components/auth-components.module';
import {StoreModule} from '@ngrx/store';
import * as fromStore from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/effects/auth.effects';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AUTH_DOMAINS} from "./tokens/auth.config";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {TokenAuthService} from "./services/token-auth.service";

@NgModule({
  imports: [
    CommonModule,
    AuthComponentsModule,
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducer),
    EffectsModule.forFeature([AuthEffects])],
})
export class AuthModule {
  static forRoot(domains: string[]): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_DOMAINS,
          useValue: domains
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
          deps: [TokenAuthService, AUTH_DOMAINS]
        }
      ]
    };
  }
}
