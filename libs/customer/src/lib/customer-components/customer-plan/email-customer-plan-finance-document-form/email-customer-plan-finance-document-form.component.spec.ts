import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCustomerPlanFinanceDocumentFormComponent } from './email-customer-plan-finance-document-form.component';

describe('EmailCustomerPlanFinanceDocumentFormComponent', () => {
  let component: EmailCustomerPlanFinanceDocumentFormComponent;
  let fixture: ComponentFixture<EmailCustomerPlanFinanceDocumentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailCustomerPlanFinanceDocumentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCustomerPlanFinanceDocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
