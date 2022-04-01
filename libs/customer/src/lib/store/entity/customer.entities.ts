import {CustomerPlanFinanceDocument} from "../../../../../shared/src/lib/models/customer/customer-plan-finance-document";

export enum CustomerEntity {
  Customer = 'Customer',
  CustomerAddress = 'CustomerAddress',
  CustomerAppliance = 'CustomerAppliance',
  CustomerApplianceType = 'CustomerApplianceType',
  CustomerPlan = 'CustomerPlan',
  CustomerPlanAppliance = 'CustomerPlanAppliance',
  CustomerPlanFinance = 'CustomerPlanFinance',
  CustomerPlanFinanceDocument = 'CustomerPlanFinanceDocument',
  DirectDebitDetails = 'DirectDebitDetails',
  EmploymentStatus = 'EmploymentStatus',
  EmploymentStatusTime = 'EmploymentStatusTime',
  ResidentialStatus = 'ResidentialStatus',
  Title = 'Title'
}

export const customerEntityMetadata = {
  [CustomerEntity.Customer]: {},
  [CustomerEntity.CustomerAddress]: {},
  [CustomerEntity.CustomerAppliance]: {},
  [CustomerEntity.CustomerApplianceType]: {},
  [CustomerEntity.CustomerPlan]: {},
  [CustomerEntity.CustomerPlanAppliance]: {},
  [CustomerEntity.CustomerPlanFinance]: {},
  [CustomerEntity.CustomerPlanFinanceDocument]: {},
  [CustomerEntity.DirectDebitDetails]: {},
  [CustomerEntity.EmploymentStatus]: {},
  [CustomerEntity.EmploymentStatusTime]: {},
  [CustomerEntity.ResidentialStatus]: {},
  [CustomerEntity.Title]: {}
}
