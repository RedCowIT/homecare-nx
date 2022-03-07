import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePaymentItemListComponent } from './invoice-payment-item-list.component';

describe('InvoicePaymentItemListComponent', () => {
  let component: InvoicePaymentItemListComponent;
  let fixture: ComponentFixture<InvoicePaymentItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicePaymentItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePaymentItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
