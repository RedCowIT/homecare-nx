import {ChecklistItemStatus} from "@homecare/common";

export interface PreJob {
  appointmentId: number;
  sections?: Array<{id: string, status: ChecklistItemStatus }>;
}
