import * as fromDocument from './document.actions';

describe('loadDocuments', () => {
  it('should return an action', () => {
    expect(fromDocument.loadDocuments().type).toBe('[Document] Load Documents');
  });
});
