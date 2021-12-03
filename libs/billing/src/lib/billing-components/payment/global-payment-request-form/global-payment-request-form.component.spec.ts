import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPaymentRequestFormComponent } from './global-payment-request-form.component';

describe('GlobalPaymentRequestFormComponent', () => {
  let component: GlobalPaymentRequestFormComponent;
  let fixture: ComponentFixture<GlobalPaymentRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalPaymentRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPaymentRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
