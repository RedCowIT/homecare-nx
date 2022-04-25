export interface CustomerPlanChange {
  customerPlanId: number;
  appointmentId: number;
  startDate: string;
  canIncrease: boolean;
  periodPrice: number;
  newPrice: number;
  description: string;
  percentIncrease: number;
}
