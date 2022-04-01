import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCustomerPlanFinanceDocumentModalComponent } from './email-customer-plan-finance-document-modal.component';

describe('EmailCustomerPlanFinanceDocumentModalComponent', () => {
  let component: EmailCustomerPlanFinanceDocumentModalComponent;
  let fixture: ComponentFixture<EmailCustomerPlanFinanceDocumentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailCustomerPlanFinanceDocumentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCustomerPlanFinanceDocumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
