import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerApplianceFormComponent } from './customer-appliance-form.component';

describe('CustomerApplianceFormComponent', () => {
  let component: CustomerApplianceFormComponent;
  let fixture: ComponentFixture<CustomerApplianceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerApplianceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerApplianceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
