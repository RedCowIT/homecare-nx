import { TestBed } from '@angular/core/testing';

import { VacuumReportFormService } from './vacuum-report-form.service';

describe('VacuumReportFormService', () => {
  let service: VacuumReportFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacuumReportFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
