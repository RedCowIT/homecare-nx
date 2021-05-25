import * as fromJob from './job.actions';

describe('loadJobs', () => {
  it('should return an action', () => {
    expect(fromJob.loadJobs().type).toBe('[Job] Load Jobs');
  });
});
