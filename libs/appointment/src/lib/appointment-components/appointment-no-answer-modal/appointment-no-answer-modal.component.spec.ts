import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentNoAnswerModalComponent } from './appointment-no-answer-modal.component';

describe('AppointmentNoAnswerModalComponent', () => {
  let component: AppointmentNoAnswerModalComponent;
  let fixture: ComponentFixture<AppointmentNoAnswerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentNoAnswerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentNoAnswerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
