import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StorageComponentsModule} from './storage-components/storage-components.module';
import {StoreModule} from '@ngrx/store';
import * as fromStore from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {storageEffects} from './store/effects/storage.effects';

@NgModule({
  imports: [
    StorageComponentsModule,
    StoreModule.forFeature(fromStore.storeFeatureKey,
      fromStore.reducers,
      { metaReducers: fromStore.metaReducers }),
    EffectsModule.forFeature(storageEffects)
  ],
})
export class StorageModule {}
