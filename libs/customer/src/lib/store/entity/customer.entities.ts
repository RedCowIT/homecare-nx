export enum CustomerEntity {
  Customer = 'Customer',
  CustomerAddress = 'CustomerAddress',
  CustomerAppliance = 'CustomerAppliance',
  CustomerApplianceType = 'CustomerApplianceType',
  CustomerPlan = 'CustomerPlan',
  CustomerPlanAppliance = 'CustomerPlanAppliance',
  CustomerPlanFinance = 'CustomerPlanFinance',
  EmploymentStatus = 'EmploymentStatus',
  EmploymentStatusTime = 'EmploymentStatusTime',
  ResidentialStatus = 'ResidentialStatus'
}

export const customerEntityMetadata = {
  [CustomerEntity.Customer]: {},
  [CustomerEntity.CustomerAddress]: {},
  [CustomerEntity.CustomerAppliance]: {},
  [CustomerEntity.CustomerApplianceType]: {},
  [CustomerEntity.CustomerPlan]: {},
  [CustomerEntity.CustomerPlanAppliance]: {},
  [CustomerEntity.CustomerPlanFinance]: {},
  [CustomerEntity.EmploymentStatus]: {},
  [CustomerEntity.EmploymentStatusTime]: {},
  [CustomerEntity.ResidentialStatus]: {}
}
