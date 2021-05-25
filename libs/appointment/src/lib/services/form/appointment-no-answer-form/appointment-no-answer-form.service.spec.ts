import { TestBed } from '@angular/core/testing';

import { AppointmentNoAnswerFormService } from './appointment-no-answer-form.service';

describe('AppointmentNoAnswerFormService', () => {
  let service: AppointmentNoAnswerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentNoAnswerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
