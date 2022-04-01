import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvenReportFormComponent } from './oven-report-form.component';

describe('OvenReportFormComponent', () => {
  let component: OvenReportFormComponent;
  let fixture: ComponentFixture<OvenReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvenReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvenReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
