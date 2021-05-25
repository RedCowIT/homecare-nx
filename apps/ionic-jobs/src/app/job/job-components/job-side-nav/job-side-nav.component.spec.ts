import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSideNavComponent } from './job-side-nav.component';

describe('JobSideNavComponent', () => {
  let component: JobSideNavComponent;
  let fixture: ComponentFixture<JobSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
