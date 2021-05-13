import * as fromStorage from './storage.actions';

describe('loadStorages', () => {
  it('should return an action', () => {
    expect(fromStorage.loadStorages().type).toBe('[Storage] Load Storages');
  });
});
