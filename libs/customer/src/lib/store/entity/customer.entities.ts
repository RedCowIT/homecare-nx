export enum CustomerEntity {
  Customer = 'Customer',
  CustomerAddress = 'CustomerAddress',
  CustomerAppliance = 'CustomerAppliance',
  CustomerPlan = 'CustomerPlan',
  CustomerPlanAppliance = 'CustomerPlanAppliance',
  CustomerPlanFinance = 'CustomerPlanFinance'
}

export const customerEntityMetadata = {
  [CustomerEntity.Customer]: {},
  [CustomerEntity.CustomerAddress]: {},
  [CustomerEntity.CustomerAppliance]: {},
  [CustomerEntity.CustomerPlan]: {},
  [CustomerEntity.CustomerPlanAppliance]: {},
  [CustomerEntity.CustomerPlanFinance]: {}
}
