export interface ApplianceType {
  id: number;
  description: string;
  icon: string;
}

export function doesApplianceTypeUseModelLookup(applianceType: ApplianceType) {
  return applianceType.description === 'Vacuum';
}
