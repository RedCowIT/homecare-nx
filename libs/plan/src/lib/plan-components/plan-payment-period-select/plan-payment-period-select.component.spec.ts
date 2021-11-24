import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPaymentPeriodSelectComponent } from './plan-payment-period-select.component';

describe('PlanPaymentPeriodSelectComponent', () => {
  let component: PlanPaymentPeriodSelectComponent;
  let fixture: ComponentFixture<PlanPaymentPeriodSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPaymentPeriodSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPaymentPeriodSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
