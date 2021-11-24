/**
 * The period at which a plan is paid: “Monthly”, “Annually”.
 */
export interface PlanPaymentPeriod {
  id: number;

  /** "Monthly" | "Annually" */
  description: string;

  /** 1 for annually; 12 for monthly; */
  multiplier: number;
}

export enum PlanPaymentPeriods {
  Monthly = 'Monthly',
  Annual = 'Annually'
}
