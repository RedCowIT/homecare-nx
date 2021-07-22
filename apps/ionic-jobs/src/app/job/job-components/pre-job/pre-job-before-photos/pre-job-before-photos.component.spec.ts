import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJobBeforePhotosComponent } from './pre-job-before-photos.component';

describe('PreJobBeforePhotosComponent', () => {
  let component: PreJobBeforePhotosComponent;
  let fixture: ComponentFixture<PreJobBeforePhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreJobBeforePhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreJobBeforePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
