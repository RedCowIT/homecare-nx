export enum BillingEntity {
  CardPayment = 'CardPayment',
  Quote = 'Quote',
  QuoteItem = 'QuoteItem',
  QuoteItemType = 'QuoteItemType',
  QuoteApplianceDetail = 'QuoteApplianceDetail',
  QuotePlanDetail = 'QuotePlanDetail',
  QuoteProductDetail = 'QuoteProductDetail',
  Invoice = 'Invoice',
  InvoiceItem = 'InvoiceItem',
  InvoiceItemType = 'InvoiceItemType',
  InvoicePayment = 'InvoicePayment',
  InvoicePaymentType = 'InvoicePaymentType',
  InvoiceStatus = 'InvoiceStatus'
}

export const billingEntityMetadata = {
  [BillingEntity.CardPayment]: {},
  [BillingEntity.Quote]: {},
  [BillingEntity.QuoteItem]: {},
  [BillingEntity.QuoteItemType]: {},
  [BillingEntity.QuoteApplianceDetail]: {},
  [BillingEntity.QuotePlanDetail]: {},
  [BillingEntity.QuoteProductDetail]: {},
  [BillingEntity.Invoice]: {},
  [BillingEntity.InvoiceItem]: {},
  [BillingEntity.InvoiceItemType]: {},
  [BillingEntity.InvoicePayment]: {},
  [BillingEntity.InvoicePaymentType]: {},
  [BillingEntity.InvoiceStatus]: {}
}
