import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteApplianceDetailFormComponent } from './quote-appliance-detail-form.component';

describe('QuoteApplianceDetailFormComponent', () => {
  let component: QuoteApplianceDetailFormComponent;
  let fixture: ComponentFixture<QuoteApplianceDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteApplianceDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteApplianceDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
