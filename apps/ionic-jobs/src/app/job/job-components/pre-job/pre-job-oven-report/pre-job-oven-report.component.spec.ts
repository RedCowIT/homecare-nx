import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJobOvenReportComponent } from './pre-job-oven-report.component';

describe('PreJobOvenReportComponent', () => {
  let component: PreJobOvenReportComponent;
  let fixture: ComponentFixture<PreJobOvenReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreJobOvenReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreJobOvenReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
