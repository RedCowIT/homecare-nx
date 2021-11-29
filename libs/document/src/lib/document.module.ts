import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponentsModule } from './document-components/document-components.module';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { DocumentEffects } from './store/effects/document.effects';

@NgModule({
  imports: [CommonModule, DocumentComponentsModule, StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, { metaReducers: fromStore.metaReducers }), EffectsModule.forFeature([DocumentEffects])],
})
export class DocumentModule {}
