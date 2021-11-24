export interface InvoiceSummary {
  invoiceId: number;
  net?: number;
  vat?: number;
  gross: number;
}
