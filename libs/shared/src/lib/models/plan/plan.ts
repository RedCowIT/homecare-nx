/**
 * A plan for performing a recurring service, e.g. "Vacuum Service Plan Annual"
 */
export interface Plan {
  id: number;
  planTypeId: number;
  productId: number;
  description: string;
  name: string;
  defaultYearlyPrice: number;
  icon: string;
}
