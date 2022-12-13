export interface PendingPayment {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  paymentType: string;
  amount: number;
  invoiceAmount: number;
}
