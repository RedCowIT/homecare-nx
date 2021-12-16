export interface CustomerPlanFinance {
  id: number;
  customerPlanId: number;
  productId: number;
  price: number;
  deposit: number;
  monthPeriodId: number;
  loan: number;
  interest: number;
  totalPayable: number;
  monthlyPayment: number;
}
