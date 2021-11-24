import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliancePlanInvoiceItemFormComponent } from './appliance-plan-invoice-item-form.component';

describe('AppliancePlanInvoiceItemFormComponent', () => {
  let component: AppliancePlanInvoiceItemFormComponent;
  let fixture: ComponentFixture<AppliancePlanInvoiceItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliancePlanInvoiceItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliancePlanInvoiceItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
