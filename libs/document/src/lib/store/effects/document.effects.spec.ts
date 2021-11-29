import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DocumentEffects } from './document.effects';

describe('DocumentEffects', () => {
  let actions$: Observable<any>;
  let effects: DocumentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DocumentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DocumentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
