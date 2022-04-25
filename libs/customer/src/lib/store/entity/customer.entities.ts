import {CustomerPlanChange} from "@homecare/shared";

export enum CustomerEntity {
  Customer = 'Customer',
  CustomerAddress = 'CustomerAddress',
  CustomerAppliance = 'CustomerAppliance',
  CustomerApplianceType = 'CustomerApplianceType',
  CustomerPlan = 'CustomerPlan',
  CustomerPlanAppliance = 'CustomerPlanAppliance',
  CustomerPlanChange = 'CustomerPlanChange',
  CustomerPlanFinance = 'CustomerPlanFinance',
  CustomerPlanFinanceDocument = 'CustomerPlanFinanceDocument',
  DirectDebitDetails = 'DirectDebitDetails',
  EmploymentStatus = 'EmploymentStatus',
  EmploymentStatusTime = 'EmploymentStatusTime',
  ResidentialStatus = 'ResidentialStatus',
  Title = 'Title'
}

export const customerPluralNames = {
  DirectDebitDetails : 'DirectDebitDetails'
};

export const customerEntityMetadata = {
  [CustomerEntity.Customer]: {},
  [CustomerEntity.CustomerAddress]: {},
  [CustomerEntity.CustomerAppliance]: {},
  [CustomerEntity.CustomerApplianceType]: {},
  [CustomerEntity.CustomerPlan]: {},
  [CustomerEntity.CustomerPlanAppliance]: {},
  [CustomerEntity.CustomerPlanChange]: {
    selectId: (customerPlanChange: CustomerPlanChange) => customerPlanChange.customerPlanId
  },
  [CustomerEntity.CustomerPlanFinance]: {},
  [CustomerEntity.CustomerPlanFinanceDocument]: {},
  [CustomerEntity.DirectDebitDetails]: {},
  [CustomerEntity.EmploymentStatus]: {},
  [CustomerEntity.EmploymentStatusTime]: {},
  [CustomerEntity.ResidentialStatus]: {},
  [CustomerEntity.Title]: {}
}
