import {ChecklistItemStatus} from "@homecare/common";
import {Policy} from "../core";

export enum JobSection {
  Info = 'info',
  PreJob = 'pre-job',
  Quote = 'quote',
  Contact = 'contact',
  Invoice = 'invoice',
  Finance = 'finance',
  Payment = 'payment',
  DD = 'dd',
  PlanChange = 'plan-change',
  SignOff = 'sign-off'
}

export const JobSections = [
  JobSection.Info,
  JobSection.PreJob
];

export const JobSectionMeta = {
  [JobSection.Info]: {
    label: 'Info',
    icon: 'information-circle-outline',
    order: 0
  },
  [JobSection.PreJob]: {
    label: 'Pre Job',
    icon: 'list',
    order: 1
  },
  [JobSection.Quote]: {
    label: 'Quote',
    icon: 'calculator',
    order: 2
  },
  [JobSection.Contact]: {
    label: 'Contact',
    icon: 'person',
    order: 3
  },
  [JobSection.Invoice]: {
    label: 'Invoice',
    icon: 'newspaper-outline',
    order: 4
  },
  [JobSection.Finance]: {
    label: 'Finance',
    icon: 'reader-outline',
    order: 5
  },
  [JobSection.Payment]: {
    label: 'Payment',
    icon: 'card',
    order: 6
  },
  [JobSection.DD]: {
    label: 'DD',
    icon: 'today',
    order: 7
  },
  [JobSection.PlanChange]: {
    label: 'Plan Update',
    icon: 'swap-vertical-outline',
    order: 8
  },
  [JobSection.SignOff]: {
    label: 'Sign Off',
    icon: 'thumbs-up-sharp',
    order: 9
  }
}

export interface JobSectionStatus {
  id: JobSection,
  status: ChecklistItemStatus
}

export function sortPolicy(a: Policy, b: Policy): number {
  return a.order - b.order;
}

export function jobSectionStatusComparer(a: JobSectionStatus, b: JobSectionStatus): number {
  return JobSectionMeta[a.id].order - JobSectionMeta[b.id].order;
}
