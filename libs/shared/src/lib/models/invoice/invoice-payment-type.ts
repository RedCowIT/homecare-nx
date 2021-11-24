export interface InvoicePaymentType {
  id: number;
  description: string;
}

export enum InvoicePaymentTypes {
  Cash = 'Cash',
  Card = 'Card',
  Cheque = 'Cheque',
  Finance = 'Finance',
  PendingCash = 'Pending Cash',
  PendingCard = 'Pending Card',
  PendingCheque = 'Pending Cheque'
}
