import {ModuleWithProviders, NgModule} from '@angular/core';
import {EntityComponentsModule} from './entity-components/entity-components.module';
import {StoreModule} from '@ngrx/store';
import * as fromStore from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {entityEffects} from './store/effects/entity.effects';
import {ENTITY_CACHE_ENABLED} from "./tokens/entity.config";
import {EntityCacheService} from "./services";
import {CacheStoreService, StorageService} from "@homecare/storage";

@NgModule({
  imports: [
    EntityComponentsModule,
    StoreModule.forFeature(fromStore.FEATURE_KEY, fromStore.reducers, { metaReducers: fromStore.metaReducers }),
    EffectsModule.forFeature(entityEffects)
  ],
})
export class EntityModule {
  static forRoot(cacheEnabled: boolean): ModuleWithProviders<EntityModule> {
    return {
      ngModule: EntityModule,
      providers: [
        {
          provide: ENTITY_CACHE_ENABLED,
          useValue: cacheEnabled
        },
        {
          provide: EntityCacheService,
          useClass: EntityCacheService,
          deps: [StorageService, CacheStoreService, ENTITY_CACHE_ENABLED]
        }
      ]
    };
  }
}
