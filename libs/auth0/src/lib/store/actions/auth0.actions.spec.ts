import * as fromAuth0 from './auth0.actions';

describe('loadAuth0s', () => {
  it('should return an action', () => {
    expect(fromAuth0.loadAuth0s().type).toBe('[Auth0] Load Auth0s');
  });
});
