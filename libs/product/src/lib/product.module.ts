import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponentsModule } from './product-components/product-components.module';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';

@NgModule({
  imports: [CommonModule, ProductComponentsModule, StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, { metaReducers: fromStore.metaReducers }), EffectsModule.forFeature([ProductEffects])],
})
export class ProductModule {}
