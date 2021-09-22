import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePlanDetailFormComponent } from './quote-plan-detail-form.component';

describe('QuotePlanDetailFormComponent', () => {
  let component: QuotePlanDetailFormComponent;
  let fixture: ComponentFixture<QuotePlanDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotePlanDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePlanDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
