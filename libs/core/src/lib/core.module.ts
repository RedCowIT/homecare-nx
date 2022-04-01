import {NgModule} from '@angular/core';
import {CoreComponentsModule} from './core-components/core-components.module';
import {StoreModule} from '@ngrx/store';
import * as fromStore from './store/reducers';
import * as fromLogStore from './store/reducers/store-log.reducer';
import {FEATURE_KEY} from './store/reducers/store-log.reducer';
import {EffectsModule} from '@ngrx/effects';
import {HttpUrlGenerator, Pluralizer} from "@ngrx/data";
import {CamelUrlGenerator} from "./services/camel-url-generator/camel-url-generator";
import {coreEffects} from "./store/effects";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ContentInterceptor} from "./interceptors/content.interceptor";


@NgModule({
  imports: [
    CoreComponentsModule,
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, {metaReducers: fromStore.metaReducers}),
    StoreModule.forFeature(FEATURE_KEY, fromLogStore.reducer, {}),
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
