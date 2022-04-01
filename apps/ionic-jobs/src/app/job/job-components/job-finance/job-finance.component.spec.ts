import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFinanceComponent } from './job-finance.component';

describe('JobFinanceComponent', () => {
  let component: JobFinanceComponent;
  let fixture: ComponentFixture<JobFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
