import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanComponentsModule } from './plan-components/plan-components.module';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { PlanEffects } from './store/effects/plan.effects';

@NgModule({
  imports: [CommonModule, PlanComponentsModule, StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, { metaReducers: fromStore.metaReducers }), EffectsModule.forFeature([PlanEffects])],
})
export class PlanModule {}
