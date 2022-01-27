import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySyncErrorModalComponent } from './entity-sync-error-modal.component';

describe('EntitySyncErrorModalComponent', () => {
  let component: EntitySyncErrorModalComponent;
  let fixture: ComponentFixture<EntitySyncErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitySyncErrorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySyncErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
