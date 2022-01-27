export interface Quote {
  id: number;
  appointmentId: number;
  customerId: number;
  quoteRef: string;
  notes: string;
  accepted: boolean;
}
