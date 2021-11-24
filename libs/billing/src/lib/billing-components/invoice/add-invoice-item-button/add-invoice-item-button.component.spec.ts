import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvoiceItemButtonComponent } from './add-invoice-item-button.component';

describe('AddInvoiceItemButtonComponent', () => {
  let component: AddInvoiceItemButtonComponent;
  let fixture: ComponentFixture<AddInvoiceItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInvoiceItemButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvoiceItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
