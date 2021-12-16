import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePlanInvoiceItemFormComponent } from './finance-plan-invoice-item-form.component';

describe('FinancePlanInvoiceItemFormComponent', () => {
  let component: FinancePlanInvoiceItemFormComponent;
  let fixture: ComponentFixture<FinancePlanInvoiceItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancePlanInvoiceItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancePlanInvoiceItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
