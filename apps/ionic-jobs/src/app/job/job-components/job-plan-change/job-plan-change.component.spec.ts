import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPlanChangeComponent } from './job-plan-change.component';

describe('JobPlanChangeComponent', () => {
  let component: JobPlanChangeComponent;
  let fixture: ComponentFixture<JobPlanChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPlanChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPlanChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
