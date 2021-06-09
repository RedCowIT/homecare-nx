import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJobSideNavComponent } from './pre-job-side-nav.component';

describe('PreJobSideNavComponent', () => {
  let component: PreJobSideNavComponent;
  let fixture: ComponentFixture<PreJobSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreJobSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreJobSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
