import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPlanListComponent } from './customer-plan-list.component';

describe('CustomerPlanListComponent', () => {
  let component: CustomerPlanListComponent;
  let fixture: ComponentFixture<CustomerPlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPlanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
