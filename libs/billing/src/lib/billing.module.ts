import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponentsModule } from './billing-components/billing-components.module';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { BillingEffects } from './store/effects/billing.effects';

@NgModule({
  imports: [CommonModule, BillingComponentsModule, StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, { metaReducers: fromStore.metaReducers }), EffectsModule.forFeature([BillingEffects])],
})
export class BillingModule {}
