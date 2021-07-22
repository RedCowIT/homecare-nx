export interface QuoteApplianceDetail {
  id: number;
  quoteItemId: number;
  applianceTypeId: number;
  brandId: number;
  model: string;
  serial?: string;
  underWarranty: boolean;
  warrantyLengthYears: number;
  datePurchase: string;
  priceRangeId: number;
}
