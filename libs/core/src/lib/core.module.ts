import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponentsModule } from './core-components/core-components.module';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './store/effects/core.effects';

@NgModule({
  imports: [CommonModule, CoreComponentsModule, StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, { metaReducers: fromStore.metaReducers }), EffectsModule.forFeature([CoreEffects])],
})
export class CoreModule {}
