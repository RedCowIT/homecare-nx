import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShampooReportFormComponent } from './shampoo-report-form.component';

describe('ShampooReportFormComponent', () => {
  let component: ShampooReportFormComponent;
  let fixture: ComponentFixture<ShampooReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShampooReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShampooReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
