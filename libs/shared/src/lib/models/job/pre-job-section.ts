import {ChecklistItemStatus} from "@homecare/common";

export enum PreJobSection {
  WorkSummary = 'work-summary',
  Appliances = 'appliances',
  BeforePhotos = 'before-photos',
  ShampooReport = 'shampoo',
  VacuumReport = 'vacuum',
  Policies = 'policies',
  Signature = 'signature'
}

export const PreJobSectionMeta = {
  [PreJobSection.WorkSummary]: {
    label: 'Work Summary',
  },
  [PreJobSection.Appliances]: {
    label: 'Appliances',
  },
  [PreJobSection.BeforePhotos]: {
    label: 'Before Photos',
  },
  [PreJobSection.VacuumReport]: {
    label: 'Vacuum Report',
  },
  [PreJobSection.Signature]: {
    label: 'Signature',
  }
}

export interface PreJobSectionStatus {
  id: PreJobSection,
  status: ChecklistItemStatus
}
