export interface CustomerPlanAppliance {
  id: number;
  customerPlanId: number;
  applianceTypeId: number;
  brandId: number;
  model: string;
  serialNo?: string;
  underWarranty: boolean;
  warrantyLengthYears: number;
  datePurchased: string;
  priceRangeId: number;
}
