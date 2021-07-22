import { TestBed } from '@angular/core/testing';

import { QuoteTableService } from './quote-table.service';

describe('QuoteTableService', () => {
  let service: QuoteTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
