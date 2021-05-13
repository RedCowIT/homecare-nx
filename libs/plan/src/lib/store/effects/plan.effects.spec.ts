import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PlanEffects } from './plan.effects';

describe('PlanEffects', () => {
  let actions$: Observable<any>;
  let effects: PlanEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlanEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PlanEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
