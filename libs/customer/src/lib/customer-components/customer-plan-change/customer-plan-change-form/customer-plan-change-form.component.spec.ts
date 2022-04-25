import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPlanChangeFormComponent } from './customer-plan-change-form.component';

describe('CustomerPlanChangeFormComponent', () => {
  let component: CustomerPlanChangeFormComponent;
  let fixture: ComponentFixture<CustomerPlanChangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPlanChangeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPlanChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
