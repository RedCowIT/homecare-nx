import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteApplianceCoverComponent } from './quote-appliance-cover.component';

describe('QuoteApplianceCoverComponent', () => {
  let component: QuoteApplianceCoverComponent;
  let fixture: ComponentFixture<QuoteApplianceCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteApplianceCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteApplianceCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
