import {ChecklistItemStatus} from "@homecare/common";

export enum PreJobSection {
  WorkSummary = 'work-summary',
  Appliances = 'appliances',
  BeforePhotos = 'before-photos',
  OvenReport = 'clean',
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
  [PreJobSection.OvenReport]: {
    label: 'Oven Report',
  },
  [PreJobSection.VacuumReport]: {
    label: 'Vacuum Report',
  },
  [PreJobSection.ShampooReport]: {
    label: 'Shampoo Report',
  },
  [PreJobSection.Policies]: {
    label: 'Policies',
  },
  [PreJobSection.Signature]: {
    label: 'Signature',
  }
}

export interface PreJobSectionStatus {
  id: PreJobSection,
  status: ChecklistItemStatus
}
