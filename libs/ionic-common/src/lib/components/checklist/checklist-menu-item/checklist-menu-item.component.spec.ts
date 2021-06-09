import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistMenuItemComponent } from './checklist-menu-item.component';

describe('ChecklistMenuItemComponent', () => {
  let component: ChecklistMenuItemComponent;
  let fixture: ComponentFixture<ChecklistMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
