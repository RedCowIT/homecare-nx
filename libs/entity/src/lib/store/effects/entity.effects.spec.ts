import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { EntityEffects } from './entity.effects';

describe('EntityEffects', () => {
  let actions$: Observable<any>;
  let effects: EntityEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EntityEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(EntityEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
