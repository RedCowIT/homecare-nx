import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { JobEffects } from './job.effects';

describe('JobEffects', () => {
  let actions$: Observable<any>;
  let effects: JobEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JobEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(JobEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
