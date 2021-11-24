export interface InvoicePayment {
  id: number;
  invoiceId: number;
  paymentTypeId: number;
  amount: number;
}
