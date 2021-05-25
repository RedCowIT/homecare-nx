import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromStore from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {AppointmentEffects} from './store/effects/appointment.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromStore.storeFeatureKey,
      fromStore.reducers,
      {metaReducers: fromStore.metaReducers}),
    EffectsModule.forFeature([AppointmentEffects])],
})
export class AppointmentModule {
}
