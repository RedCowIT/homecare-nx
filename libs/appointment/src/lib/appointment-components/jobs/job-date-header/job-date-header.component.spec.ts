import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDateHeaderComponent } from './job-date-header.component';

describe('JobDateHeaderComponent', () => {
  let component: JobDateHeaderComponent;
  let fixture: ComponentFixture<JobDateHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDateHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
