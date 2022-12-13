import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import * as fromStore from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {AppointmentEffects} from './store/effects/appointment.effects';
import {PLURAL_NAMES_TOKEN} from "@ngrx/data";
import {appointmentPluralNames} from "./store/entity";

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromStore.storeFeatureKey,
      fromStore.reducers,
      {metaReducers: fromStore.metaReducers}),
    EffectsModule.forFeature([AppointmentEffects])],
  providers: [
    {provide: PLURAL_NAMES_TOKEN, multi: true, useValue: appointmentPluralNames}
  ]
})
export class AppointmentModule {
}
