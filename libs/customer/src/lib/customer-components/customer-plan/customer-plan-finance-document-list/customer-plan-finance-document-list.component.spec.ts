import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPlanFinanceDocumentListComponent } from './customer-plan-finance-document-list.component';

describe('CustomerPlanFinanceDocumentListComponent', () => {
  let component: CustomerPlanFinanceDocumentListComponent;
  let fixture: ComponentFixture<CustomerPlanFinanceDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPlanFinanceDocumentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPlanFinanceDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
