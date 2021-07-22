import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteOtherPlansComponent } from './quote-other-plans.component';

describe('QuoteOtherPlansComponent', () => {
  let component: QuoteOtherPlansComponent;
  let fixture: ComponentFixture<QuoteOtherPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteOtherPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteOtherPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
