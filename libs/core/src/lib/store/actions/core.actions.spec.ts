import * as fromCore from './core.actions';

describe('loadCores', () => {
  it('should return an action', () => {
    expect(fromCore.loadCores().type).toBe('[Core] Load Cores');
  });
});
