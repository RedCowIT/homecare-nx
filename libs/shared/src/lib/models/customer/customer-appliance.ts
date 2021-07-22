export interface CustomerAppliance {
  id: number;
  customerId: number;
  applianceTypeId: number;
  manufacturerId?: number;
  modelId?: number;
  manufacturerText?: string;
  modelText?: string;
  serialNo?: string;
  saleDate?: string;
  active: boolean;
}
