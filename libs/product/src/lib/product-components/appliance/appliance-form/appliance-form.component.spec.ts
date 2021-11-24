import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceFormComponent } from './appliance-form.component';

describe('ApplianceFormComponent', () => {
  let component: ApplianceFormComponent;
  let fixture: ComponentFixture<ApplianceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplianceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplianceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
