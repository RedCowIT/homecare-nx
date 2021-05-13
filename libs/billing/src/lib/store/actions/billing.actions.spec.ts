import * as fromBilling from './billing.actions';

describe('loadBillings', () => {
  it('should return an action', () => {
    expect(fromBilling.loadBillings().type).toBe('[Billing] Load Billings');
  });
});
