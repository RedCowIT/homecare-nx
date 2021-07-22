import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacuumReportFormComponent } from './vacuum-report-form.component';

describe('VacuumReportFormComponent', () => {
  let component: VacuumReportFormComponent;
  let fixture: ComponentFixture<VacuumReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacuumReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacuumReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
