import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPlanInvoiceItemFormComponent } from './customer-plan-invoice-item-form.component';

describe('CustomerPlanInvoiceItemFormComponent', () => {
  let component: CustomerPlanInvoiceItemFormComponent;
  let fixture: ComponentFixture<CustomerPlanInvoiceItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPlanInvoiceItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPlanInvoiceItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
