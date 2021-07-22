import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJobShampooReportComponent } from './pre-job-shampoo-report.component';

describe('PreJobShampooReportComponent', () => {
  let component: PreJobShampooReportComponent;
  let fixture: ComponentFixture<PreJobShampooReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreJobShampooReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreJobShampooReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
