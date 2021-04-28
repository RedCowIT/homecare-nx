import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { Auth0Effects } from './auth0.effects';

describe('Auth0Effects', () => {
  let actions$: Observable<any>;
  let effects: Auth0Effects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Auth0Effects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(Auth0Effects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
