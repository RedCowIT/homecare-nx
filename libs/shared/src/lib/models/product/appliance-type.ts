export interface ApplianceType {
  id: number;
  description: string;
  appImgURL: string;
}

export function doesApplianceTypeUseModelLookup(applianceType: ApplianceType) {
  return applianceType.description === 'Vacuum';
}
