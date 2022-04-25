import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponentsModule } from './customer-components/customer-components.module';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from './store/effects/customer.effects';
import {PLURAL_NAMES_TOKEN} from "@ngrx/data";
import {customerPluralNames} from "./store/entity";

@NgModule({
  imports: [
    CommonModule,
    CustomerComponentsModule,
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, { metaReducers: fromStore.metaReducers }),
    EffectsModule.forFeature([CustomerEffects]),

  ],

  providers: [
    { provide: PLURAL_NAMES_TOKEN, multi: true, useValue: customerPluralNames }
  ]
})
export class CustomerModule {}
