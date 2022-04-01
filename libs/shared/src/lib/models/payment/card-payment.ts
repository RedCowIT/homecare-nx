export interface CardPayment {
  id: number;
  success: boolean;
  customerId: number;
  appointmentId: number;
  invoiceId: number;
  invoiceNo: string;
  amount: number;
  created: string;
}
