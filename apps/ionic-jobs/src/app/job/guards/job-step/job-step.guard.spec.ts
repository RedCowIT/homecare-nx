import { TestBed } from '@angular/core/testing';

import { JobStepGuard } from './job-step.guard';

describe('JobStepGuard', () => {
  let guard: JobStepGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JobStepGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
