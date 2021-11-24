import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInvoiceItemFormComponent } from './product-invoice-item-form.component';

describe('ProductInvoiceItemFormComponent', () => {
  let component: ProductInvoiceItemFormComponent;
  let fixture: ComponentFixture<ProductInvoiceItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInvoiceItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInvoiceItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
