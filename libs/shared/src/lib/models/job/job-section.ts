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
  }
}

export interface JobSectionStatus {
  id: JobSection,
  status: ChecklistItemStatus
}

