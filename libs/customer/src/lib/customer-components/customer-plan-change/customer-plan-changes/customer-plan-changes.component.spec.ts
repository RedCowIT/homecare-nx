import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPlanChangesComponent } from './customer-plan-changes.component';

describe('CustomerPlanChangesComponent', () => {
  let component: CustomerPlanChangesComponent;
  let fixture: ComponentFixture<CustomerPlanChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPlanChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPlanChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
