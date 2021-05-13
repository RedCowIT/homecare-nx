import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponentsModule } from './customer-components/customer-components.module';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from './store/effects/customer.effects';

@NgModule({
  imports: [CommonModule, CustomerComponentsModule, StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, { metaReducers: fromStore.metaReducers }), EffectsModule.forFeature([CustomerEffects])],
})
export class CustomerModule {}
