import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostJobAfterPhotosComponent } from './post-job-after-photos.component';

describe('PostJobAfterPhotosComponent', () => {
  let component: PostJobAfterPhotosComponent;
  let fixture: ComponentFixture<PostJobAfterPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostJobAfterPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostJobAfterPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
