import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteTableComponent } from './quote-table.component';

describe('QuoteTableComponent', () => {
  let component: QuoteTableComponent;
  let fixture: ComponentFixture<QuoteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
