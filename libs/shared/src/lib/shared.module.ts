import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromStore from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {SharedEffects} from './store/effects/shared.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, {metaReducers: fromStore.metaReducers}), EffectsModule.forFeature([SharedEffects])
  ],
})
export class SharedModule {
}
