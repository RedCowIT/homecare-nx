import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPlanFinanceDocumentModalComponent } from './customer-plan-finance-document-modal.component';

describe('CustomerPlanFinanceDocumentModalComponent', () => {
  let component: CustomerPlanFinanceDocumentModalComponent;
  let fixture: ComponentFixture<CustomerPlanFinanceDocumentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPlanFinanceDocumentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPlanFinanceDocumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
