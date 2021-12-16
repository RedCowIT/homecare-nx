import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePlanFormComponent } from './finance-plan-form.component';

describe('FinancePlanFormComponent', () => {
  let component: FinancePlanFormComponent;
  let fixture: ComponentFixture<FinancePlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancePlanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancePlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
