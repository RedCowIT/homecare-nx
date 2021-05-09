import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AppointmentEffects } from './appointment.effects';

describe('AppointmentEffects', () => {
  let actions$: Observable<any>;
  let effects: AppointmentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppointmentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AppointmentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
