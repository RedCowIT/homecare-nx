import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {JobRoutingModule} from './job-routing.module';
import {JobComponentsModule} from './job-components/job-components.module';
import {StoreModule} from '@ngrx/store';
import * as fromStore from './store/reducers/job.reducer';
import {EffectsModule} from '@ngrx/effects';
import {JobEffects} from './store/effects/job.effects';
import {PreJobEffects} from "./store/effects/pre-job.effects";
import {QuoteEffects} from "./store/effects/quote.effects";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JobRoutingModule,
    JobComponentsModule,
    StoreModule.forFeature(fromStore.FEATURE_KEY,
      fromStore.reducer),
    EffectsModule.forFeature([
      JobEffects,
      PreJobEffects,
      QuoteEffects
    ])
  ]
})
export class JobModule {
}
