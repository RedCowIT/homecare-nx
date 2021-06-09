import {ChecklistItemStatus} from "@homecare/common";

export enum JobSection {
  Info = 'info',
  PreJob = 'pre-job',
  Quote = 'quote',
  Contact = 'contact',
  Invoice = 'invoice',
  Payment = 'payment',
  DD = 'dd',
  SignOff = 'sign-off'
}

export const JobSections = [
  JobSection.Info,
  JobSection.PreJob
];

export const JobSectionMeta = {
  [JobSection.Info]: {
    label: 'Info',
    icon: 'information-circle-outline'
  },
  [JobSection.PreJob]: {
    label: 'Pre Job',
    icon: 'list'
  },
  [JobSection.Quote]: {
    label: 'Quote',
    icon: 'calculator'
  },
  [JobSection.Contact]: {
    label: 'Quote',
    icon: 'calculator'
  },
  [JobSection.Contact]: {
    label: 'Contact',
    icon: 'person'
  },
  [JobSection.Invoice]: {
    label: 'Invoice',
    icon: 'newspaper-outline'
  },
  [JobSection.Payment]: {
    label: 'Payment',
    icon: 'card'
  },
  [JobSection.DD]: {
    label: 'DD',
    icon: 'today'
  },
  [JobSection.SignOff]: {
    label: 'Sign Off',
    icon: 'thumbs-up-sharp'
  }
}

export interface JobSectionStatus {
  id: JobSection,
  status: ChecklistItemStatus
}

