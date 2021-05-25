import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAnswerButtonComponent } from './no-answer-button.component';

describe('NoAnswerButtonComponent', () => {
  let component: NoAnswerButtonComponent;
  let fixture: ComponentFixture<NoAnswerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAnswerButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAnswerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
