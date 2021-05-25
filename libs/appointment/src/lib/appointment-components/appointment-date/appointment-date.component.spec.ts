import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDateComponent } from './appointment-date.component';

describe('AppointmentDateComponent', () => {
  let component: AppointmentDateComponent;
  let fixture: ComponentFixture<AppointmentDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
