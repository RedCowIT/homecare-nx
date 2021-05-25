import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardListItemComponent } from './job-card-list-item.component';

describe('JobCardListItemComponent', () => {
  let component: JobCardListItemComponent;
  let fixture: ComponentFixture<JobCardListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCardListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
