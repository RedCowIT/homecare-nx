import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerApplianceTableComponent } from './customer-appliance-table.component';

describe('CustomerApplianceTableComponent', () => {
  let component: CustomerApplianceTableComponent;
  let fixture: ComponentFixture<CustomerApplianceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerApplianceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerApplianceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
