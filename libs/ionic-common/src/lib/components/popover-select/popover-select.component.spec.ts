import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverSelectComponent } from './popover-select.component';

describe('PopoverSelectComponent', () => {
  let component: PopoverSelectComponent;
  let fixture: ComponentFixture<PopoverSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopoverSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
