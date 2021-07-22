import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCustomerContactComponent } from './job-customer-contact.component';

describe('JobCustomerContactComponent', () => {
  let component: JobCustomerContactComponent;
  let fixture: ComponentFixture<JobCustomerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCustomerContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCustomerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
