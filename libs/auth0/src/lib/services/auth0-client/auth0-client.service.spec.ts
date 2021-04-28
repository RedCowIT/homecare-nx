import { TestBed } from '@angular/core/testing';

import { Auth0ClientService } from './auth0-client.service';

describe('Auth0ClientService', () => {
  let service: Auth0ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth0ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
