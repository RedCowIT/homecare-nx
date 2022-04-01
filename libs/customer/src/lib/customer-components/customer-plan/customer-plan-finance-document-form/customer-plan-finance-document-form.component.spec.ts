import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPlanFinanceDocumentFormComponent } from './customer-plan-finance-document-form.component';

describe('CustomerPlanFinanceDocumentFormComponent', () => {
  let component: CustomerPlanFinanceDocumentFormComponent;
  let fixture: ComponentFixture<CustomerPlanFinanceDocumentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPlanFinanceDocumentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPlanFinanceDocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
