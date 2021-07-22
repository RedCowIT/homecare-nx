import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCompleteComponent } from './quote-complete.component';

describe('QuoteCompleteComponent', () => {
  let component: QuoteCompleteComponent;
  let fixture: ComponentFixture<QuoteCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
