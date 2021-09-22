export enum BillingEntity {
  Quote = 'Quote',
  QuoteItem = 'QuoteItem',
  QuoteItemType = 'QuoteItemType',
  QuoteApplianceDetail = 'QuoteApplianceDetail',
  QuotePlanDetail = 'QuotePlanDetail',
  QuoteProductDetail = 'QuoteProductDetail'
}

export const billingEntityMetadata = {
  [BillingEntity.Quote]: {},
  [BillingEntity.QuoteItem]: {},
  [BillingEntity.QuoteItemType]: {},
  [BillingEntity.QuoteApplianceDetail]: {},
  [BillingEntity.QuotePlanDetail]: {},
  [BillingEntity.QuoteProductDetail]: {},
}
