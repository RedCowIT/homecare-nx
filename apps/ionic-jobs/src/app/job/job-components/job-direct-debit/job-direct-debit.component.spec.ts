import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDirectDebitComponent } from './job-direct-debit.component';

describe('JobDirectDebitComponent', () => {
  let component: JobDirectDebitComponent;
  let fixture: ComponentFixture<JobDirectDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDirectDebitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDirectDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
