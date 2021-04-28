import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth0ComponentsModule } from './auth0-components/auth0-components.module';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { Auth0Effects } from './store/effects/auth0.effects';

@NgModule({
  imports: [CommonModule, Auth0ComponentsModule, StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, { metaReducers: fromStore.metaReducers }), EffectsModule.forFeature([Auth0Effects])],
})
export class Auth0Module {}
