import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardListComponent } from './job-card-list.component';

describe('JobCardListComponent', () => {
  let component: JobCardListComponent;
  let fixture: ComponentFixture<JobCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
