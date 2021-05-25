export interface CustomerPlan {
  id: number;
  customerId: number;
  planId: number;
  invoiceId: number;
  appointmentId?: number; // appointment at which plan was sold
  startDate: string;
  expiryDate: string;
  periodPrice: number;
  planPaymentPeriodId: number;
}
