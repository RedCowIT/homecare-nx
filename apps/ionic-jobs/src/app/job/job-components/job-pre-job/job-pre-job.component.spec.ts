import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPreJobComponent } from './job-pre-job.component';

describe('JobPreJobComponent', () => {
  let component: JobPreJobComponent;
  let fixture: ComponentFixture<JobPreJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPreJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPreJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
