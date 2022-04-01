import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteLockedComponent } from './quote-locked.component';

describe('QuoteLockedComponent', () => {
  let component: QuoteLockedComponent;
  let fixture: ComponentFixture<QuoteLockedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteLockedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteLockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
