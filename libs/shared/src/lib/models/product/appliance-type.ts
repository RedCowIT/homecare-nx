import {CustomerApplianceType} from "../customer";

export interface ApplianceType {
  id: number;
  description: string;
  icon: string;
}

export function doesCustomerApplianceTypeUseModelLookup(customerApplianceType: CustomerApplianceType) {
  return customerApplianceType.description === 'Vacuum';
}
