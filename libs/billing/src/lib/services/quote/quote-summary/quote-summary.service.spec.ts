import { TestBed } from '@angular/core/testing';

import { QuoteSummaryService } from './quote-summary.service';

describe('QuoteSummaryService', () => {
  let service: QuoteSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
