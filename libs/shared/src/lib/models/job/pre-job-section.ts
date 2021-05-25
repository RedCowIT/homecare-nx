import {ChecklistItemStatus} from "@homecare/common";
import {JobSection} from "./job-section";

export enum PreJobSection {
  WorkSummary = 'work-summary',
  Appliances = 'pre-job',
  BeforePhotos = 'quote',
  ShampooReport = 'contact',
  VacuumReport = 'invoice',
  Policies = 'payment',
  Signature = 'dd'
}

export const PreJobSections = [
  PreJobSection.WorkSummary
];

export const PreJobSectionMeta = {
  [PreJobSection.WorkSummary]: {
    label: 'Work Summary',
  }
}
export interface PreJobSectionStatus {
  id: PreJobSection,
  status: ChecklistItemStatus
}
