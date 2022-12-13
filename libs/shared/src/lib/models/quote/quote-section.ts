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
    icon: 'cube-outline'
  },
  [QuoteSection.Products]: {
    label: 'Products',
    icon: 'pricetag-outline'
  },
  [QuoteSection.OtherPlans]: {
    label: 'Other Plans',
    icon: 'sparkles-outline'
  },
  [QuoteSection.CompleteQuote]: {
    label: 'Complete Quote',
    icon: 'checkmark-outline'
  }
}

export interface QuoteSectionStatus {
  id: QuoteSection,
  status: ChecklistItemStatus
}
