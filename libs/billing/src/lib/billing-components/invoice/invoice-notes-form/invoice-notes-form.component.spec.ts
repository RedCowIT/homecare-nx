import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceNotesFormComponent } from './invoice-notes-form.component';

describe('InvoiceNotesFormComponent', () => {
  let component: InvoiceNotesFormComponent;
  let fixture: ComponentFixture<InvoiceNotesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceNotesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceNotesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
