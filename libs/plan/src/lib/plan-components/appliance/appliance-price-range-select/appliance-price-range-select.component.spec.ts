import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliancePriceRangeSelectComponent } from './appliance-price-range-select.component';

describe('AppliancePriceRangeSelectComponent', () => {
  let component: AppliancePriceRangeSelectComponent;
  let fixture: ComponentFixture<AppliancePriceRangeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliancePriceRangeSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliancePriceRangeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
