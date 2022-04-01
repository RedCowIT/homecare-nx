import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInvoiceFormComponent } from './email-invoice-form.component';

describe('EmailInvoiceFormComponent', () => {
  let component: EmailInvoiceFormComponent;
  let fixture: ComponentFixture<EmailInvoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailInvoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
