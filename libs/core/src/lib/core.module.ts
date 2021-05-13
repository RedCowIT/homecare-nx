import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreComponentsModule} from './core-components/core-components.module';
import {StoreModule} from '@ngrx/store';
import * as fromStore from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {HttpUrlGenerator, Pluralizer} from "@ngrx/data";
import {CamelUrlGenerator} from "./services/camel-url-generator/camel-url-generator";
import {coreEffects} from "./store/effects";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ContentInterceptor} from "./interceptors/content.interceptor";

@NgModule({
  imports: [
    CommonModule,
    CoreComponentsModule,
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, {metaReducers: fromStore.metaReducers}),
    EffectsModule.forFeature(coreEffects)
  ],
  providers: [
    {provide: HttpUrlGenerator, useClass: CamelUrlGenerator, deps: [Pluralizer]},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
