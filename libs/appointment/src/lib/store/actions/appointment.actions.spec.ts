import * as fromAppointment from './appointment.actions';

describe('loadAppointments', () => {
  it('should return an action', () => {
    expect(fromAppointment.loadAppointments().type).toBe('[Appointment] Load Appointments');
  });
});
