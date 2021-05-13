import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StorageEffects } from './storage.effects';

describe('StorageEffects', () => {
  let actions$: Observable<any>;
  let effects: StorageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StorageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
