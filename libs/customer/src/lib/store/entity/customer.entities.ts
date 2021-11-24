export enum CustomerEntity {
  Customer = 'Customer',
  CustomerAddress = 'CustomerAddress',
  CustomerAppliance = 'CustomerAppliance',
  CustomerPlan = 'CustomerPlan',
  CustomerPlanAppliance = 'CustomerPlanAppliance'
}

export const customerEntityMetadata = {
  [CustomerEntity.Customer]: {},
  [CustomerEntity.CustomerAddress]: {},
  [CustomerEntity.CustomerAppliance]: {},
  [CustomerEntity.CustomerPlan]: {},
  [CustomerEntity.CustomerPlanAppliance]: {}
}
