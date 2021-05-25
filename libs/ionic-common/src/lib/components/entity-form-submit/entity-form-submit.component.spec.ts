import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFormSubmitComponent } from './entity-form-submit.component';

describe('EntityFormSubmitComponent', () => {
  let component: EntityFormSubmitComponent;
  let fixture: ComponentFixture<EntityFormSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityFormSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFormSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
