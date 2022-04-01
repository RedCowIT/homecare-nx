import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaymentListComponent } from './card-payment-list.component';

describe('CardPaymentListComponent', () => {
  let component: CardPaymentListComponent;
  let fixture: ComponentFixture<CardPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPaymentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
