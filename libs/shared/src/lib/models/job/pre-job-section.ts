import {ChecklistItemStatus} from "@homecare/common";
import {JobSection} from "./job-section";

export enum PreJobSection {
    WorkSummary = 'work-summary',
    Appliances = 'appliances',
    BeforePhotos = 'before-photos',
    ShampooReport = 'shampoo',
    VacuumReport = 'vacuum',
    Policies = 'policies',
    Signature = 'signature'
}

export const PreJobSections = [
    PreJobSection.WorkSummary
];

export const PreJobSectionMeta = {
    [PreJobSection.WorkSummary]: {
        label: 'Work Summary',
    },
    [PreJobSection.Appliances]: {
        label: 'Appliances',
    },
    [PreJobSection.BeforePhotos]: {
        label: 'Before Photos',
    }
}

export interface PreJobSectionStatus {
    id: PreJobSection,
    status: ChecklistItemStatus
}
