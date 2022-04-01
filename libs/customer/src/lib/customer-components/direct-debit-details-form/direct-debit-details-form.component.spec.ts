import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDebitDetailsFormComponent } from './direct-debit-details-form.component';

describe('DirectDebitDetailsFormComponent', () => {
  let component: DirectDebitDetailsFormComponent;
  let fixture: ComponentFixture<DirectDebitDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectDebitDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectDebitDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
