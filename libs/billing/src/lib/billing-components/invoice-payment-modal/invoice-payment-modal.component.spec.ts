import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePaymentModalComponent } from './invoice-payment-modal.component';

describe('InvoicePaymentModalComponent', () => {
  let component: InvoicePaymentModalComponent;
  let fixture: ComponentFixture<InvoicePaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicePaymentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
