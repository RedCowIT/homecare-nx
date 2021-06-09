import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCallTypeListComponent } from './appointment-call-type-list.component';

describe('AppointmentCallTypeListComponent', () => {
  let component: AppointmentCallTypeListComponent;
  let fixture: ComponentFixture<AppointmentCallTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCallTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCallTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
