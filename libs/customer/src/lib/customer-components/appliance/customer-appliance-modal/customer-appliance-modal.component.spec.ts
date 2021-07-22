import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerApplianceModalComponent } from './customer-appliance-modal.component';

describe('CustomerApplianceModalComponent', () => {
  let component: CustomerApplianceModalComponent;
  let fixture: ComponentFixture<CustomerApplianceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerApplianceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerApplianceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
