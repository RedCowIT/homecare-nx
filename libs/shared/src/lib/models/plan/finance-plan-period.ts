export interface FinancePlanPeriod {
  id: number;

  /** "6" | "12" | "18" | "24" | "36" */
  months: number;

  rate: number;
}
