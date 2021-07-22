import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJobSignatureComponent } from './pre-job-signature.component';

describe('PreJobSignatureComponent', () => {
  let component: PreJobSignatureComponent;
  let fixture: ComponentFixture<PreJobSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreJobSignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreJobSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
