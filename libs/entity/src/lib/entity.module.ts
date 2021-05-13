import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EntityComponentsModule} from './entity-components/entity-components.module';
import {StoreModule} from '@ngrx/store';
import * as fromStore from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {entityEffects} from './store/effects/entity.effects';

@NgModule({
  imports: [
    CommonModule,
    EntityComponentsModule,
    StoreModule.forFeature(fromStore.FEATURE_KEY, fromStore.reducers, { metaReducers: fromStore.metaReducers }),
    EffectsModule.forFeature(entityEffects)
  ],
})
export class EntityModule {}
