import { TestBed } from '@angular/core/testing';

import { InvoiceNotesFormService } from './invoice-notes-form.service';

describe('InvoiceNotesFormService', () => {
  let service: InvoiceNotesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceNotesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
