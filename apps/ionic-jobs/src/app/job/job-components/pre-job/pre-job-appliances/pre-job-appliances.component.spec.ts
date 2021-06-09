import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJobAppliancesComponent } from './pre-job-appliances.component';

describe('PreJobAppliancesComponent', () => {
  let component: PreJobAppliancesComponent;
  let fixture: ComponentFixture<PreJobAppliancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreJobAppliancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreJobAppliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
