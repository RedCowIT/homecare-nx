import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJobWorkSummaryComponent } from './pre-job-work-summary.component';

describe('PreJobWorkSummaryComponent', () => {
  let component: PreJobWorkSummaryComponent;
  let fixture: ComponentFixture<PreJobWorkSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreJobWorkSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreJobWorkSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
