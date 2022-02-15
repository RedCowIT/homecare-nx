export interface Appointment {
  id: number;
  customerId: number;
  addressId: number;
  appointmentTypeId: number;
  appointmentStatusId: number;
  engineerId: number;
  callTypeId: number;
  bookingDateTime: string;
  notes: string;
  priceAgreed: number;
  rebooked: boolean;
  invoiced: boolean;
}
