import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteApplianceDetailModalComponent } from './quote-appliance-detail-modal.component';

describe('QuoteApplianceDetailModalComponent', () => {
  let component: QuoteApplianceDetailModalComponent;
  let fixture: ComponentFixture<QuoteApplianceDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteApplianceDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteApplianceDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
