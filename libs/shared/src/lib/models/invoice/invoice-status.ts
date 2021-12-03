export interface InvoiceStatus {
  id: number;
  description: string;
}

export enum InvoiceStatuses {
  Outstanding = 'Outstanding',
  Paid = 'Paid',
  Void = 'Void',
  'Engineer Pending' ='Engineer Pending'
}
