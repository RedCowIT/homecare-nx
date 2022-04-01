import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPlanFinanceDocumentListItemComponent } from './customer-plan-finance-document-list-item.component';

describe('CustomerPlanFinanceDocumentListItemComponent', () => {
  let component: CustomerPlanFinanceDocumentListItemComponent;
  let fixture: ComponentFixture<CustomerPlanFinanceDocumentListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPlanFinanceDocumentListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPlanFinanceDocumentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
