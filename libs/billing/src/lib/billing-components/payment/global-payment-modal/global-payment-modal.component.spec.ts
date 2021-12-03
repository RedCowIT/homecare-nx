import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPaymentModalComponent } from './global-payment-modal.component';

describe('GlobalPaymentModalComponent', () => {
  let component: GlobalPaymentModalComponent;
  let fixture: ComponentFixture<GlobalPaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalPaymentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
