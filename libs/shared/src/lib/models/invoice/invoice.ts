export interface Invoice {
  id: number;
  appointmentId: number;
  invoiceNumber: string;
  invoiceDate: string;
  customerId: number;
  customerAddressId: number;
  CustomerReference: string;
  currencyId: number;
  orderedRate: number;
  paidRate: number;
  chargesAmount: number;
  goodsAmount: number;
  discountAmount: number;
  totalNetAmount: number;
  totalVATAmount: number;
  grossAmount: number;
  invoiceStatusId: number;
  notes: string;
  serviceNotes: string;
  soldBy: number;
}
