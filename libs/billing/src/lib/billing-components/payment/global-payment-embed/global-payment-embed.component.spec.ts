import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPaymentEmbedComponent } from './global-payment-embed.component';

describe('GlobalPaymentEmbedComponent', () => {
  let component: GlobalPaymentEmbedComponent;
  let fixture: ComponentFixture<GlobalPaymentEmbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalPaymentEmbedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPaymentEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
