import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSideNavComponent } from './quote-side-nav.component';

describe('QuoteSideNavComponent', () => {
  let component: QuoteSideNavComponent;
  let fixture: ComponentFixture<QuoteSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
