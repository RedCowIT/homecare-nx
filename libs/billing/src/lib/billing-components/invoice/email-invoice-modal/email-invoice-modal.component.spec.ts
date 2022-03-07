import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInvoiceModalComponent } from './email-invoice-modal.component';

describe('EmailInvoiceModalComponent', () => {
  let component: EmailInvoiceModalComponent;
  let fixture: ComponentFixture<EmailInvoiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailInvoiceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInvoiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
