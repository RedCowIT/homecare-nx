import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteProductDetailModalComponent } from './quote-product-detail-modal.component';

describe('QuoteProductDetailModalComponent', () => {
  let component: QuoteProductDetailModalComponent;
  let fixture: ComponentFixture<QuoteProductDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteProductDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteProductDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
