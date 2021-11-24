import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverSelectButtonComponent } from './popover-select-button.component';

describe('PopoverSelectButtonComponent', () => {
  let component: PopoverSelectButtonComponent;
  let fixture: ComponentFixture<PopoverSelectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopoverSelectButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverSelectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
