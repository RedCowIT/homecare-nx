import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPaymentsTableComponent } from './pending-payments-table.component';

describe('PendingPaymentsTableComponent', () => {
  let component: PendingPaymentsTableComponent;
  let fixture: ComponentFixture<PendingPaymentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPaymentsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPaymentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
