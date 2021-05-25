import {ChecklistItemStatus} from "./checklist-item-status";

export interface ChecklistMenuItem {
  id: string;
  label: string;
  route: string;
  status: ChecklistItemStatus
  icon?: string;
}
