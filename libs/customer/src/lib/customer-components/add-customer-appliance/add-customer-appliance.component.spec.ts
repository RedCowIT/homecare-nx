import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerApplianceComponent } from './add-customer-appliance.component';

describe('AddCustomerApplianceComponent', () => {
  let component: AddCustomerApplianceComponent;
  let fixture: ComponentFixture<AddCustomerApplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerApplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerApplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
