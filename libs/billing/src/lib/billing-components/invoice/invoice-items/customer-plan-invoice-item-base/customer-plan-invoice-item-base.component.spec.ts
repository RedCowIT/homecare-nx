import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPlanInvoiceItemBaseComponent } from './customer-plan-invoice-item-base.component';

describe('CustomerPlanInvoiceItemBaseComponent', () => {
  let component: CustomerPlanInvoiceItemBaseComponent;
  let fixture: ComponentFixture<CustomerPlanInvoiceItemBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPlanInvoiceItemBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPlanInvoiceItemBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
