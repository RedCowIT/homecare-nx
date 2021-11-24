export interface InvoiceItem {
  id: number;
  invoiceId: number;
  invoiceItemTypeId: number;
  productId: number;
  chargeId: number;
  description?: string;
  productCode?: string;
  nominalCodeId: number;
  vatInclusive: number;
  vatStatusId: number;
  unitPrice: number;
  qty: number;
  linenett: number;
  linevat: number;
  linegross: number;
  unitDiscountPercent: number;
  unitDiscountPrice: number;
}
