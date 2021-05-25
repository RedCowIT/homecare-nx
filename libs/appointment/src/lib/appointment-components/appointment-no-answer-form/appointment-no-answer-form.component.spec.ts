
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentNoAnswerFormComponent } from './appointment-no-answer-form.component';

describe('AppointmentNoAnswerFormComponent', () => {
  let component: AppointmentNoAnswerFormComponent;
  let fixture: ComponentFixture<AppointmentNoAnswerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentNoAnswerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentNoAnswerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
