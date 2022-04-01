export interface GlobalPaymentRequest {
  invoiceId: number;
  appointmentId: number;
  invoiceNumber: string;
  description: string;
  amount: number;
  email: string;
  phone: string;
  customerAddress1: string;
  customerAddress2: string;
  customerAddress3: string;
  customerCity: string;
  customerPostcode: string;
  billingAddress1: string;
  billingAddress2: string;
  billingAddress3: string;
  billingCity: string;
  billingPostcode: string;
}
