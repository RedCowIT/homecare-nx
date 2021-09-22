import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteProductDetailFormComponent } from './quote-product-detail-form.component';

describe('QuoteProductDetailFormComponent', () => {
  let component: QuoteProductDetailFormComponent;
  let fixture: ComponentFixture<QuoteProductDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteProductDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteProductDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
