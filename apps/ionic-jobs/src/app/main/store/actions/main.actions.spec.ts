import * as fromMain from './main.actions';

describe('loadMains', () => {
  it('should return an action', () => {
    expect(fromMain.loadMains().type).toBe('[Main] Load Mains');
  });
});
