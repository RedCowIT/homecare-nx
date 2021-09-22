import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePlanDetailModalComponent } from './quote-plan-detail-modal.component';

describe('QuotePlanDetailModalComponent', () => {
  let component: QuotePlanDetailModalComponent;
  let fixture: ComponentFixture<QuotePlanDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotePlanDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePlanDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
