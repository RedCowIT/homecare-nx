import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJobPoliciesComponent } from './pre-job-policies.component';

describe('PreJobPoliciesComponent', () => {
  let component: PreJobPoliciesComponent;
  let fixture: ComponentFixture<PreJobPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreJobPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreJobPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
