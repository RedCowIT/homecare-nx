import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponentsModule } from './main-components/main-components.module';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './store/effects/main.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainRoutingModule,
    MainComponentsModule,
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, { metaReducers: fromStore.metaReducers }),
    EffectsModule.forFeature([MainEffects])
  ]
})
export class MainModule { }
