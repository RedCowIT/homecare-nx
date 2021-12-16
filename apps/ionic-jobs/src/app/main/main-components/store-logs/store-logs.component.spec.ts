import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLogsComponent } from './store-logs.component';

describe('StoreLogsComponent', () => {
  let component: StoreLogsComponent;
  let fixture: ComponentFixture<StoreLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
