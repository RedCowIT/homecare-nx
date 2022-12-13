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
    icon: 'information-circle-outline'
  },
  [PreJobSection.Appliances]: {
    label: 'Appliances',
    icon: 'cube-outline'
  },
  [PreJobSection.BeforePhotos]: {
    label: 'Before Photos',
    icon: 'camera-outline'
  },
  [PreJobSection.OvenReport]: {
    label: 'Oven Report',
    icon: 'clipboard-outline'
  },
  [PreJobSection.VacuumReport]: {
    label: 'Vacuum Report',
    icon: 'clipboard-outline'
  },
  [PreJobSection.ShampooReport]: {
    label: 'Shampoo Report',
    icon: 'clipboard-outline'
  },
  [PreJobSection.Policies]: {
    label: 'Policies',
    icon: 'document-outline'
  },
  [PreJobSection.Signature]: {
    label: 'Signature',
    icon: 'pencil-outline'
  }
}

export interface PreJobSectionStatus {
  id: PreJobSection,
  status: ChecklistItemStatus
}
