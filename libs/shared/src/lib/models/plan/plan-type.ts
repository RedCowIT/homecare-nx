export interface PlanType {
  id: number;

  /** @example Vacuum Service Plan */
  description: string;

  icon: string;

  /** Available to add as 'other plan' **/
  commercial: boolean;
}

export enum PlanTypes {
  VacuumService = 'Vacuum Service Plan',
  ApplianceRepairPlan = 'Appliance Repair Plan',
  Clean = 'Clean',
  Shampoo = 'Shampoo',
  Finance = 'Finance'
}

export const servicePlanTypes = [
  PlanTypes.Clean.toString(),
  PlanTypes.Shampoo.toString(),
  PlanTypes.VacuumService.toString()
];
