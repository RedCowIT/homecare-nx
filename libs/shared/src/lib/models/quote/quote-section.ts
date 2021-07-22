import {ChecklistItemStatus} from "@homecare/common";

export enum QuoteSection {
  ApplianceCover = 'appliance-cover',
  Products = 'products',
  OtherPlans = 'other-plans',
  CompleteQuote = 'complete-quote'
}

export const QuoteSectionMeta = {
  [QuoteSection.ApplianceCover]: {
    label: 'Appliance Cover',
  },
  [QuoteSection.Products]: {
    label: 'Products',
  },
  [QuoteSection.OtherPlans]: {
    label: 'Other Plans',
  },
  [QuoteSection.CompleteQuote]: {
    label: 'Complete Quote',
  }
}

export interface QuoteSectionStatus {
  id: QuoteSection,
  status: ChecklistItemStatus
}
