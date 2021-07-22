import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJobVacuumReportComponent } from './pre-job-vacuum-report.component';

describe('PreJobVacuumReportComponent', () => {
  let component: PreJobVacuumReportComponent;
  let fixture: ComponentFixture<PreJobVacuumReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreJobVacuumReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreJobVacuumReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
