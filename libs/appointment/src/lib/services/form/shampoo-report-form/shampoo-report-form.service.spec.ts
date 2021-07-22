import { TestBed } from '@angular/core/testing';

import { ShampooReportFormService } from './shampoo-report-form.service';

describe('ShampooReportFormService', () => {
  let service: ShampooReportFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShampooReportFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
