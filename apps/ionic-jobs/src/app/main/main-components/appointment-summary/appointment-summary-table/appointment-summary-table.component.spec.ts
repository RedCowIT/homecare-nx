import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSummaryTableComponent } from './appointment-summary-table.component';

describe('AppointmentSummaryTableComponent', () => {
  let component: AppointmentSummaryTableComponent;
  let fixture: ComponentFixture<AppointmentSummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentSummaryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
