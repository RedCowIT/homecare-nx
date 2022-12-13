import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPaymentSummaryComponent } from './pending-payment-summary.component';

describe('PendingPaymentSummaryComponent', () => {
  let component: PendingPaymentSummaryComponent;
  let fixture: ComponentFixture<PendingPaymentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPaymentSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
