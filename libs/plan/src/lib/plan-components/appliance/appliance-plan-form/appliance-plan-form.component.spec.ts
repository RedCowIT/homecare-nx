import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliancePlanFormComponent } from './appliance-plan-form.component';

describe('AppliancePlanFormComponent', () => {
  let component: AppliancePlanFormComponent;
  let fixture: ComponentFixture<AppliancePlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliancePlanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliancePlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
