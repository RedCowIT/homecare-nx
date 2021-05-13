import { TestBed } from '@angular/core/testing';

import { DataErrorService } from './data-error.service';

describe('DataErrorService', () => {
  let service: DataErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
