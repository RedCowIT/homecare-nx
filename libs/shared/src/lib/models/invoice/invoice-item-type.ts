export interface InvoiceItemType {
  id: number;
  description: string;
}

/**
 * EngineerParts - Dyson / Kirby Parts Pop Up (might get rid of this pop up)
 Engineer Service - Service pop up
 Engineer Plan - Service Plan pop up
 Engineer Plan - Repair Plan pop up
 Engineer Plan - Hire Purchase Plan pop up
 Engineer Misc - Full List pop up
 */
export enum InvoiceItemTypes {
  Service = 'Service',
  ServicePlan = 'ServicePlan',
  RepairPlan = 'RepairPlan',
  FinancePlan = 'HirePurchasePlan',
  Misc = 'Misc'
};

export const invoiceItemMeta = {
  [InvoiceItemTypes.Service]: {
    description: 'Engineer Service'
  },
  [InvoiceItemTypes.ServicePlan]: {
    description: 'Engineer Plan'
  },
  [InvoiceItemTypes.RepairPlan]: {
    description: 'Engineer Plan'
  },
  [InvoiceItemTypes.FinancePlan]: {
    description: 'Engineer Plan'
  },
  [InvoiceItemTypes.Misc]: {
    description: 'Engineer Misc'
  }
};
